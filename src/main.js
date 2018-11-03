// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import store from './store';
import App from './App';
import router from './router';
import { sync } from 'vuex-router-sync';

// chart js
import 'chart.js';
import 'hchs-vue-charts';

Vue.use(window.VueCharts);

// vuex
sync(store, router);

Vue.config.productionTip = false;

// onsen UI
Vue.use(VueOnsen);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
