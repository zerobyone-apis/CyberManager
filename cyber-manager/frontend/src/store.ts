import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    theme: 'dark',
    page: 'Home',
    userInfo: {
      id: -1,
      username: '',
      charge: '',
      isAdmin: ''
    },
    empresaInfo: {
      id: '',
      garantia: '',
      tecnico: ''
    }
  },
  mutations: {
    setTheme(state: any, value) {
      state.theme = value;
    },
    page(state: any, value) {
      state.page = value;
    },
    wizard(state: any, value) {
      state.wizard = value;
    },
    userInfo(state, value) {
      state.userInfo = value;
    },
    empresaInfo(state, value) {
      state.empresaInfo = value;
    },
    clearUserInfo(state) {
      state.userInfo = {
        id: -1,
        username: '',
        charge: '',
        isAdmin: ''
      };
    }
  },
  getters: {
    theme: state => state.theme,
    page: state => state.page,
    userInfo: state => state.userInfo,
    getUsername: state => state.userInfo.username,
    getCharge: state => state.userInfo.charge,
    getIsAdmin: state => state.userInfo.isAdmin,
    userLogged: state => (state.userInfo.id == -1 ? false : true),
    empresaInfo: state => state.empresaInfo,
    getGarantia: state => state.empresaInfo.garantia,
    getTecnico: state => state.empresaInfo.tecnico,
    getIdEmpresa: state => state.empresaInfo.id
  },
  plugins: [vuexLocal.plugin]
});
