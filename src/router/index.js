import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '../views/Auth.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => (import('../views/Home.vue')),
    beforeEnter: (to, from, next) => {
      let isLogged = localStorage.getItem('user');
      if(!isLogged) {
        router.push({name: 'auth'})
      } 
      next(); 
    }
  },
  {
    path: '/room',
    name: 'room',
    component: () => (import('../views/Room.vue'))
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    beforeEnter: (to, from, next) => {
      let isLogged = localStorage.getItem('user');
      if(isLogged) {
        router.push({name: 'home'})
      } 
      next(); 
    }
    
  },
  {
    path: '/registration',
    name: 'reg',
    component: () => (import('../views/Registration.vue')),
    beforeEnter: (to, from, next) => {
      let isLogged = localStorage.getItem('user');
      if(isLogged) {
        router.push({name: 'home'})
      } 
      next(); 
    }
  },
  // {
  //   path: '/auth',
  //   name: 'auth',
  //   component: Auth
  // }
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
});



export default router;
