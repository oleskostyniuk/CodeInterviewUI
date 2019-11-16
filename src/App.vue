<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
  created() {
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
</style>
