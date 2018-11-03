<template>
    <v-ons-select style="width: 40%">
        <option
            v-for="(item,index) in getDateList"
            :value="item"
            :key="index"
        >{{ item | getDateString }}</option>
    </v-ons-select>
</template>

<script>
import ServerConnection from '@/Connection/ServerConnection'

export default {
    data() {
        return {};
    },
    computed: {
        getDateList() {
            return this.$store.state.dateList;
        },
    },
    filters: {
        getDateString(date) {
            const d = new Date(date);
            return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
        },
    },
}
</script>

<style scoped>
</style>