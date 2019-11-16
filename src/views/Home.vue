<template>
  <div class="grey darken-3 h-100">
    <app-navbar></app-navbar>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <span class="w-100 text-center">Hello world</span>
          <app-create-room></app-create-room>
          <app-create-task></app-create-task>
          <app-task-list></app-task-list>
        </v-flex> 
      </v-layout>
    </v-container>
  </div>
  
</template>

<script>
import navBar from '../components/app-navbar.vue';
import taskList from '../components/app-task-list.vue';
import createTask from '../components/app-task-create.vue';
import createRoom from '../components/app-room-create.vue';

export default {
  name: 'home',
  components: {
    'app-navbar': navBar,
    'app-create-task': createTask,
    'app-task-list': taskList,
    'app-create-room': createRoom
  }
}
</script>
