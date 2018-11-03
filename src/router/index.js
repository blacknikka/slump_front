import Vue from 'vue';
import Router from 'vue-router';

import TopPage from '@/components/layouts/TopPage';
import StoreDetailPage from '@/components/layouts/StoreDetailPage';
import MachinePage from '@/components/layouts/MachinePage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Top',
      component: TopPage,
    },
    {
      path: '/store',
      name: 'StoreDetail',
      component: StoreDetailPage,
    },
    {
      path: '/machine',
      name: 'MachineDetail',
      component: MachinePage,
    },
  ],
});
