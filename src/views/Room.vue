<template>
  <v-card dark>
		<app-toolbar></app-toolbar>
    <v-layout class="room">
      <v-flex xs6>
				<app-code-editor width="100%"
					height="calc(100vh - 64px)"
					theme="vs-dark"
					language="javascript"
					:options="options"
					@change="onChange"></app-code-editor>
      </v-flex>
			<v-flex xs6>
				<v-card flat class="mx-2 mt-3">
					<div class="pa-2 grey darken-4">TASK</div>
				</v-card>
			</v-flex>
    </v-layout>
  </v-card>
</template>

<script>
// import io from 'socket.io-client';
import monacoEditor from 'monaco-editor-vue';
import roomToolbar from '../components/app-navbar';
export default {
	name: 'room',
	data: () => ({
		socket: null,
		options: {
		}
	}),
	components: {
		'app-code-editor': monacoEditor,
		'app-toolbar': roomToolbar
	},
	methods: {
		onChange(value) {
			console.log(value);
		}
		// initSocketConnection: function() {
		// 	let socket = io.connect('http://localhost:3000');
			
		// 	socket.on('connect', function (data) {
				
		// 	});

		// 	socket.on('connect', function (data) {
				
		// 	});

		// 	socket.on('connect', function (data) {
				
		// 	});
		// }
	},
	created() {
		// this.initSocketConnection();
	}
}
</script>

<style scoped>
.room{
	height: calc(100vh - 64px);
}
</style>