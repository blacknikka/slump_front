<template>
    <v-ons-list modifier="inset">
        <v-ons-list-header>{{data.groupName}}</v-ons-list-header>
        <data-component :data="item" v-for="(item, index) in data.dataList" :key="index"></data-component>
    </v-ons-list>
</template>

<script>
import DataComponent from "@/components/parts/DataComponent";
export default {
    props: {
        data: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    components: {
        DataComponent
    }
}
</script>

<style scoped>
</style>

