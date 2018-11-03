<template>
    <v-ons-page>
        <section style="margin: 16px">
            <div>{{getCurrentDate}}</div>
            <chartjs-line
                :linetension="0"
                :labels="chartData.labels"
                :data="chartData.dataset"
                :bind="true"
                :bordercolor="'#27405b'"
            ></chartjs-line>
        </section>
    </v-ons-page>
</template>

<script>
import ServerConnection from '@/Connection/ServerConnection'

export default {
    data() {
        return {
            chartData: {
                labels: ['0'],
                dataset: [0],
            },
        }
    },
    computed: {
        getCurrentDate() {
            const date = this.$store.state.currentDate;
            if(date !== '') {
                this.getChartFromServer();
            }
            return date;
        },
    },
    methods: {
        async getChartFromServer() {
            const store_id = this.$route.params.store_id;
            const machine_no = this.$route.params.machine_no;

            // チャートを取得する
            ServerConnection.connect(
                `slump/get/store_id/${store_id}/${machine_no}/${this.$store.state.currentDate}`
            ).then(response => {
                const res = response.data;

                // スランプデータを追加する
                let total = 0;
                res.data.forEach(array => {
                    total += array.amount;
                    this.chartData.dataset.push(total);
                });

                if (3 < this.chartData.dataset.length) {
                    // 配列数が３つより大きい場合にはスランプの添え字を書く
                    const mid = Math.floor(this.chartData.dataset.length / 2) - 1;

                    for (let index = 0, max = this.chartData.dataset.length; index < max; index++) {
                        if (index === mid || index === (max - 1)) {
                            this.chartData.labels.push(String(50 * index));
                        } else {
                            this.chartData.labels.push('');
                        }
                    }
                }

                this.$store.commit('setChartData', this.chartData);
            });
        },
    },
}
</script>

<style scoped>
</style>