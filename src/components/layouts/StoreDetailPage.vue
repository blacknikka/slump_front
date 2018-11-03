<template>
    <section style="margin: 16px">
        <transition name="globalfade">
            <div v-if="isLoaded">
                <data-group-component
                    :data="item"
                    v-for="(item, index) in machinelist"
                    :key="index"
                ></data-group-component>
            </div>
        </transition>
        <div v-if="isLoaded === false" class="globalload">
            <v-ons-progress-circular indeterminate v-cloak></v-ons-progress-circular>
        </div>
    </section>
</template>

<script>
import _ from 'lodash';
import ServerConnection from '@/Connection/ServerConnection';
import DataGroupComponent from '@/components/parts/DataGroupComponent';

export default {
    data() {
        return {
            isLoaded: false,
            machinelist: [],
        };
    },
    async mounted() {
        this.$store.commit('setTitle', 'Store Detail');

        const params = this.$route.params;
        if ('id' in params) {
            await this.getStoreDetailData(params.id);
        } else {
            this.machinelist.push({
                groupName: 'erro',
                dataList: [
                    {
                        id: 0,
                        content: '読み込めませんでした',
                        kind: 'error',
                    },
                ],
            });
            this.isLoaded = true;
        }
    },
    methods: {
        async getStoreDetailData(id) {
            const url = `machine/get/machines/store_id/${id}`;
            ServerConnection.connect(url).then(response => {
                const res = response.data;
                res.data.forEach(array => {
                    const result = _.find(res.master, (x) => {
                        return x.machine_id === array.machine_id;
                    });
                    this.machinelist.push({
                        groupName: array.number,
                        dataList: [
                            {
                                store_id: res.store_id,
                                machine_no: array.number,
                                content: result.name,
                                kind: 'machine',
                            },
                        ],
                    })

                    this.isLoaded = true;
                });
            });
        }
    },
    components: {
        DataGroupComponent,
    },
}
</script>

<style scoped>
</style>

