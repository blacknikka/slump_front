<template>
    <v-ons-list-item modifier="longdivider" @click="clickedEvent">{{data.content}}</v-ons-list-item>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    methods: {
        clickedEvent() {
            if (this.data.kind === 'store') {
                this.$router.replace({
                    name: 'StoreDetail',
                    params: {
                        id: this.data.id,
                    },
                });
            } else if (this.data.kind === 'machine') {
                this.$router.replace({
                    name: 'MachineDetail',
                    params: {
                        store_id: this.data.store_id,
                        machine_no: this.data.machine_no,
                    },
                });
            }
        },
    }
}
</script>

<style scoped>
</style>

