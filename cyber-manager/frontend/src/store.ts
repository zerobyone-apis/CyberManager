import Vue from "vue";
import Vuex from "vuex";
import main from "./main";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userInfo: {
      id: -1,
      username: '',
      charge: ''
    },
  },
  mutations: {
    wizard(state, value) {
      state.wizard = value;
    },
    userInfo(state, value) {
      state.userInfo = value;
    },
    clearUserInfo(state) {
      state.userInfo = {
        id: -1,
        username: '',
        charge: ''
      }
    }
  },
  getters: {
    userInfo: state => state.userInfo,
    getUsername: state => state.userInfo.username,
    getCharge: state => state.userInfo.charge,
    userLogged: state => state.userInfo.id == -1 ? false : true,
  },
  plugins: [vuexLocal.plugin]
});
