import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userInfo: {
      idUser: -1,
      username: '',
      charge: '',
      isAdmin: ''
    },
    empresaInfo: {
      idEmpresa: '',
      garantia: '',
      tecnico: ''
    }
  },
  mutations: {
    wizard(state, value) {
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
        idUser: -1,
        username: '',
        charge: '',
        isAdmin: ''
      };
    }
  },
  getters: {
    userInfo: state => state.userInfo,
    getUsername: state => state.userInfo.username,
    getCharge: state => state.userInfo.charge,
    getIsAdmin: state => state.userInfo.isAdmin,
    userLogged: state => (state.userInfo.idUser == -1 ? false : true),
    empresaInfo: state => state.empresaInfo,
    getGarantia: state => state.empresaInfo.garantia,
    getTecnico: state => state.empresaInfo.tecnico,
    getIdEmpresa: state => state.empresaInfo.idEmpresa
  },
  plugins: [vuexLocal.plugin]
});
