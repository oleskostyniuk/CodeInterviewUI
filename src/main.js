import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO(`${store.state.serverUrl}/room`), 
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    options: { path: "/room/" } 
    }
}));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
