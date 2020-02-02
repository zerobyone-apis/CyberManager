import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./pages/home/home.vue')
    },
    {
      path: '/Identification',
      name: 'Identification',
      component: () => import('./pages/identification/identification.vue')
    }
  ]
});
