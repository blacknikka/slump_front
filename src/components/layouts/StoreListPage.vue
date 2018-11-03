<template>
    <section style="margin: 16px">
        <transition name="globalfade">
            <div v-if="isLoaded">
                <data-group-component :data="item" v-for="(item, index) in list" :key="index"></data-group-component>
            </div>
        </transition>
        <div v-if="isLoaded === false" class="globalload">
            <v-ons-progress-circular indeterminate v-cloak></v-ons-progress-circular>
        </div>
    </section>
</template>

<script>
import ServerConnection from '@/Connection/ServerConnection'
import DataGroupComponent from '@/components/parts/DataGroupComponent'

export default {
    data() {
        return {
            isLoaded: false,
            list: [],
        };
    },
    async mounted() {
        await this.getStoreData();
    },
    methods: {
        async getStoreData() {
            ServerConnection.connect(
                'store/get/all'
            ).then(response => {
                const res = response.data;
                res.data.forEach(array => {
                    this.list.push({
                        groupName: array.name,
                        dataList: [
                            {
                                id: array.id,
                                content: array.name,
                                kind: 'store',
                            },
                        ],
                    })
                });

                // load complete
                this.isLoaded = true;
            });

        },
    },
    components: {
        DataGroupComponent,
    },
}
</script>

<style scoped>
</style>

