<template>
  <v-app>
    <app-global-messages></app-global-messages>
    <router-view></router-view>
  </v-app>
</template>

<script>
import globalMessage from './components/app-global-error.vue';
export default {
  name: 'App',
  components:{
    'app-global-messages': globalMessage
  },
  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch('getLanguagesList');
    let jwt = localStorage.getItem('user');
    if(jwt) {
      jwt = JSON.parse(jwt);
      let isExpired = new Date(jwt.expirationDate).getTime() - new Date().getTime();
      if(isExpired > 0) {
        this.$store.dispatch('reLogUser', jwt);
      } else {
        localStorage.removeItem('user');
      }
    }
  }
};
</script>

<style>
.w-100 {
  width: 100%;
}
.w-50{
  width: 50%;
}
.w-25{
  width: 25%;
}
.h-100{
  min-height: 100vh;
}
html{
  overflow: auto !important;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
  border-radius: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>
