<template>
  <div class="grey darken-3 h-100">
    <app-navbar></app-navbar>
    <app-create-room v-if="createRoom" @close="createRoom = false"></app-create-room>
    <app-create-task v-if="isNewTask" @close='isNewTask = false'></app-create-task>

    <v-container>
      <v-layout>
        <v-flex xs6>
          <v-card dark class="pa-2">
            <app-task-list></app-task-list>
            <v-btn class="d-block ml-auto" color="success" @click="isNewTask = true">Create new task</v-btn>
          </v-card>
        </v-flex> 
        <v-flex>
          <v-btn class="ma-auto d-block" @click="createRoom = true">Start Interview</v-btn>
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
  data: () => ({
    isNewTask: false,
    createRoom: false
  }),
  components: {
    'app-navbar': navBar,
    'app-create-task': createTask,
    'app-task-list': taskList,
    'app-create-room': createRoom
  }
}
</script>
