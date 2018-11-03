<template>
    <v-ons-page>
        <section style="margin: 16px">
            <div>
                <div>{{getCurrentDate}}</div>
                <hit-history-item
                    v-for="(item, index) in getHistoryData"
                    :key="index"
                    :dataSet="getHistoryTarget(index)"
                ></hit-history-item>
            </div>
        </section>
    </v-ons-page>
</template>

<script>
import _ from 'lodash';
import ServerConnection from '@/Connection/ServerConnection'
import HitHistoryItem from '@/components/parts/HitHistoryItem'

export default {
    computed: {
        getImages() {
            return _.map(this.$store.state.bonusData, (d) => {
                const image = `data:image/jpg;base64,${d.image}`;
                return image;
            });
        },
        getHistoryData() {
            return this.$store.state.hitHistoryData;
        },
        getCurrentDate() {
            const date = this.$store.state.currentDate;
            if (date !== '') {
                this.getHitsFromServer();
            }
            return date;
        },
    },
    methods: {
        getHistoryTarget(idx) {
            return this.$store.state.hitHistoryData[idx];
        },
        getHitsFromServer() {
            const store_id = this.$route.params.store_id;
            const machine_no = this.$route.params.machine_no;

            ServerConnection.connect(
                `machine/get/histories/store_id/${store_id}/${machine_no}/${this.$store.state.currentDate}`
            ).then(response => {
                const hitData = [];
                hitData.push({
                    isTitle: true,
                });
                _.each(response.data.data, (d, idx) => {
                    hitData.push({
                        isTitle: false,
                        no: idx + 1,
                        gameCount: d.game_count,
                        bonusName: d.name,
                    });
                });

                this.$store.commit('setHitHistoryData', hitData);
            });
        },
    },
    components: {
        HitHistoryItem,
    },
}
</script>

<style scoped>
</style>

