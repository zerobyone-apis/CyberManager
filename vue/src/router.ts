import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/home/home.vue')
    },
    {
      path: '/Repairs',
      name: 'Repairs',
      component: () => import('./views/repairs/repairs.vue')
    },
    {
      path: '/Identification',
      name: 'Identification',
      component: () => import('./views/identification/identification.vue')
    },
  ],
});
