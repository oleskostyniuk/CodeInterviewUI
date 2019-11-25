import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth.js';
import task from './modules/task.js';
import room from './modules/room.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    globalMessages: [],
    serverUrl: 'http://192.168.1.121:3000'
    // serverUrl: 'http://192.168.43.243:3000'
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
    addGlobalMessage({state, commit}, message) {
      if(message.type === 'success') {
        let msgIndex = state.globalMessages.length;
        setTimeout(() => {commit('DELETE_GLOBAL_MESSAGE', msgIndex);}, 1500);
      }
      commit('ADD_GLOBAL_MESSAGE', message);

    },
    deleteGlobalMessage({commit}, msgIndex) {
      commit('DELETE_GLOBAL_MESSAGE', msgIndex);
    }
  },
  modules: {
    auth,
    task,
    room
  }
});
