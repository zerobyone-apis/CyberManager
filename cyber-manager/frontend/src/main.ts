import Vue from "vue";
import vuetify from "./plugins/vuetify";
import Vuetify from 'vuetify'
import App from "./app/app.vue";
import router from "./router";
import { store } from "./store";
import 'vue-croppa/dist/vue-croppa.css';

// import vueprint from 'vue-print-nb'
// vue-print-nb is manual declared in shims-vue.d.ts

Vue.config.productionTip = false;
Vue.use(vuetify);
Vue.use(Vuetify);
// Vue.use(vueprint)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default {
};
