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
    drawerLeft: false,
    dialogs: {
      access: false //login & signUp
    },
    userInfo: {
      id: -1,
      username: '',
      charge: ''
    },
    selectedOrder: {
      id: -1,
    }
  },
  mutations: {
    drawerLeft(state, value) {
      state.drawerLeft = value;
    },
    userInfo(state, value) {
      state.userInfo = value;
    },
    accessDialog(state, value) {
      state.dialogs.access = value;
    },
    selectedOrder(state, value) {
      state.selectedOrder.id = value.id;
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
    userLogged: state => state.userInfo.id == -1 ? false : true,
    drawerLeft: state => state.drawerLeft,
    accessDialog: state => state.dialogs.access,
    orderSelected: state => state.selectedOrder.id,
  },
  plugins: [vuexLocal.plugin]
});
