import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  title: 'title',

  // serverからのデータ
  baseData: {},
  hitsData: {},
  chartData: {},
  bonusData: [],
  hitHistoryData: [],
  dateList: [],

  // 現在選択中の日付
  currentDate: ''
};

const mutations = {
  // 基本情報
  setBaseData(state, payload) {
    state.baseData = payload;
  },
  // 現在の日付を設定
  setCurrentDate(state, payload) {
    const d = new Date(payload);
    state.currentDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  },
  // 日付情報
  setDateList(state, payload) {
    state.dateList = payload;
  },
  // 大当たり情報
  setHitsData(state, payload) {
    state.hitsData = payload;
  },
  // チャート情報
  setChartData(state, payload) {
    state.chartData = payload;
  },
  // 大当たりアイコン情報
  setBonusData(state, payload) {
    state.bonusData.push({
      name: payload.name,
      image: `data:image/jpg;base64,${payload.image}`
    });
  },
  // アイコン情報初期化
  clearBonusData(state) {
    state.bonusData.splice(0);
  },
  // 大当たり履歴
  setHitHistoryData(state, payload) {
    state.hitHistoryData = payload;
  },
  // タイトルセット
  setTitle(state, payload) {
    state.title = payload;
  }
};

const getters = {
  getCurrentTitle: state => {
    return state.title;
  }
};

const actions = {};

export default new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
});
