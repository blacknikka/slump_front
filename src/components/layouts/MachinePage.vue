<template>
    <section style="margin: 16px">
        <v-ons-tabbar position="auto" :visible="true" :tabs="tabs" :index.sync="activeIndex"></v-ons-tabbar>
        <div v-show="false">{{title}}</div>
    </section>
</template>

<script>
import BasePage from '@/components/layouts/BasePage';
import ChartPage from '@/components/layouts/ChartPage';
import HitPage from '@/components/layouts/HitPage';

export default {
    name: 'index',
    data() {
        return {
            activeIndex: 0,
            tabs: [
                {
                    icon: 'fa-home',
                    label: 'Base',
                    page: BasePage,
                },
                {
                    icon: 'fa-chart-line',
                    label: 'Chart',
                    page: ChartPage,
                },
                {
                    icon: 'fa-table',
                    label: 'History',
                    page: HitPage,
                },
            ]
        };
    },
    methods: {
        md() {
            return this.$ons.platform.isAndroid();
        }
    },
    computed: {
        title() {
            const titlestr = this.tabs[this.activeIndex].label;
            this.$store.commit('setTitle', titlestr);
            return titlestr;
        }
    },
    components: {
        BasePage,
        ChartPage,
        HitPage,
    },
};
</script>

<style scoped>
</style>