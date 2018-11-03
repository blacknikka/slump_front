<template>
    <v-ons-page>
        <section style="margin: 16px">
            <transition name="globalfade">
                <div v-show="getDisplayState">
                    <date-list-view></date-list-view>
                    <ons-row>
                        <ons-col class="table-title">Machine</ons-col>
                        <ons-col class="table-title">{{baseData.machine_name}}</ons-col>
                    </ons-row>
                    <ons-row>
                        <ons-col>Setting</ons-col>
                        <ons-col>Secret...</ons-col>
                    </ons-row>
                    <ons-row>
                        <ons-col>Game count</ons-col>
                        <ons-col>{{baseData.games}}</ons-col>
                    </ons-row>
                    <ons-row v-for="(item, index) in hitsData" :key="index">
                        <ons-col>{{item.name}}</ons-col>
                        <ons-col>{{item.count}}</ons-col>
                    </ons-row>
                    <ons-row>
                        <ons-col>IN</ons-col>
                        <ons-col>{{baseData.in}}</ons-col>
                    </ons-row>
                    <ons-row>
                        <ons-col>OUT</ons-col>
                        <ons-col>{{baseData.out}}</ons-col>
                    </ons-row>
                    <ons-row>
                        <ons-col>Pay</ons-col>
                        <ons-col>{{getPayCount}}</ons-col>
                    </ons-row>
                    <ons-row>
                        <ons-col>Pay out</ons-col>
                        <ons-col>{{getPayOut | filterPercentage}}</ons-col>
                    </ons-row>
                </div>
            </transition>
        </section>
    </v-ons-page>
</template>

<script>
import ServerConnection from '@/Connection/ServerConnection';
import DateListView from '@/components/parts/DateListView';

export default {
    data() {
        return {
            isBaseLoaded: false,
            isHistsLoaded: false,
            baseData: {
                // 基本情報
                machine_name: '',
                games: 0,
                max: 0,
                in: 0,
                out: 0,
                date: 0,
                store_name: 0,
            },
            // 当たり情報
            hitsData: [],
            // 遊技機ID
            machine_id: null,
        };
    },
    computed: {
        getPayCount() {
            return this.baseData.out - this.baseData.in;
        },
        getPayOut() {
            return this.baseData.out / this.baseData.in;
        },
        getDisplayState() {
            return this.isBaseLoaded === true && this.isHistsLoaded === true;
        }
    },
    filters: {
        filterPercentage(number) {
            let ret = 0;
            if (number < 1) {
                ret = (number * 100).toFixed(2);
            } else {
                ret = number.toFixed(2);
            }

            return ret;
        }
    },
    async mounted() {
        const store_id = this.$route.params.store_id;
        const machine_no = this.$route.params.machine_no;

        // 基本情報を取得する
        await ServerConnection.connect(
            `machine/get/base/store_id/${store_id}/${machine_no}`
        ).then(response => {
            const res = response.data;
            const data = res.data;

            this.baseData.machine_name = data.machine_name;
            this.baseData.games = data.games;
            this.baseData.max = data.max;
            this.baseData.in = data.in;
            this.baseData.out = data.out;
            this.baseData.date = data.date;
            this.baseData.sotre_name = data.name;

            this.machine_id = res.machine_id;

            // 基本情報をセットする
            this.$store.commit('setBaseData', this.baseData);

            // 日付履歴をセットする
            this.$store.commit('setDateList', data.dates);
            let currentDate = '';
            if(data.dates.length > 0) {
                currentDate = data.dates[0];
            }
            this.$store.commit('setCurrentDate', currentDate);
        }).finally(() => {
            this.isBaseLoaded = true;
        });

        // 日付情報取得
        const date = this.$store.state.currentDate;

        // 大当たり情報を取得する
        await ServerConnection.connect(
            `machine/get/hits/store_id/${store_id}/${machine_no}/${date}`
        ).then(response => {
            const res = response.data;

            res.data.forEach(array => {
                this.hitsData.push({
                    name: array.name,
                    type: array.type,
                    count: array.count,
                })
            });

            this.$store.commit('setHitsData', this.hitsData);
        }).finally(() => {
            this.isHistsLoaded = true;
        });

        // 大当たりの画像を取得（アイコン）
        if (this.machine_id !== null) {
            // 大当たり情報（画像）を初期化する
            this.$store.commit('clearBonusData');

            // アイコンの取得
            this.hitsData.forEach(element => {
                ServerConnection.connect(
                    `image/get/${this.machine_id}/${element.name}`
                ).then(response => {

                    this.$store.commit('setBonusData', {
                        name: element.name,
                        image: response.data.data,
                    });
                });
            });
        }
    },
    components: {
        DateListView,
    },
}
</script>

<style scoped>
ons-col {
  border: 1px solid #ccc;
  background: #fff;
  overflow: hidden;
  padding: 4px;
  color: rgb(88, 78, 78);
  border-radius: 7px;
}
.table-title {
  background: rgb(194, 207, 144);
  border-bottom: 2px;
  border-radius: 3px;
}
</style>

