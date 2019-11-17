import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    globalMessages: []

  },
  mutations: {
    'ADD_GLOBAL_MESSAGE': function(state, message) {
      state.globalMessages.push(message);
    },
    'DELETE_GLOBAL_MESSAGE': function(state, msgIndex) {
      state.globalMessages.splice(msgIndex, 1);
    }

  },
  actions: {
    addGlobalMessage({commit}, message) {
      commit('ADD_GLOBAL_MESSAGE', message);
    },
    deleteGlobalMessage({commit}, msgIndex) {
      commit('DELETE_GLOBAL_MESSAGE', msgIndex);
    }
  },
  modules: {
    auth    
  }
});
