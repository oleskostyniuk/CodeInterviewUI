<template>
  <v-card dark class="h-100">
		<!-- <app-toolbar></app-toolbar> -->
    <v-layout class="room flex-wrap">
      <v-flex xs12 md6>
				<app-code-editor width="100%"
					height="calc(100vh)"
					theme="vs-dark"
					language="javascript"
					:options="options"
					:value="code"
					@input="onChange"></app-code-editor>
      </v-flex>
			<v-flex xs12 md6>
				<v-card class="pa-2 grey darken-4 d-flex">
					<v-flex xs12>
						<app-video-chat></app-video-chat>
					</v-flex>
				</v-card>
				<v-card flat class="mx-2 mt-3">
					<div class="pa-2 grey darken-4 d-flex">TASK</div>
					<router-link :to="{name: 'room', query: {'room': getSocketUrl}}" 
						v-if="socketUrl.length > 0 && isInterviewer">
						<v-btn class="success">{{getSocketUrl}}</v-btn>
					</router-link>
				</v-card>
			</v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import monacoEditor from 'monaco-editor-vue';
import _ from 'lodash';
import videoChat from '../components/app-video-chat.vue';
// import roomToolbar from '../components/app-navbar';
export default {
	name: 'room',
	data: () => ({
		code: '123',
		socketUrl: '',
		isInterviewer: false,
		isCreator: false,
		options: {
		}
	}),
	sockets: {
		'message': data => {
			this.handleEvent(data);
		},
		'new-code': (data) => {
			if(self.code !== data) {
				self.code = data;
			}
		}
	},
	components: {
		'app-code-editor': monacoEditor,
		'app-video-chat': videoChat,
		// 'app-toolbar': roomToolbar
	},
	computed: {
		getUrlParam: {
			get() {
				return location.search.length !== 0 ? location.search : '';
			}
		},
		getSocketUrl: {
			get() {
				let url = this.socketUrl;
				return url.slice(6);
			}
		}
	},
	methods: {
		onChange: _.debounce(function(value) {
				if(value !== this.code) {
					this.code = value;
					this.$socket.emit('code-changed', value);
				}
		}, 500),
		
		initSocketConnection: function() {
			const self = this;
			if(this.getUrlParam.length === 0) {
				this.isInterviewer = true;
				this.$socket.emit('create-room', 123, function (data) {
					self.handleEvent(data, 'success');
					self.socketUrl = 123;
				});
			} else {
				this.$socket.emit('connect-room', 123, (data) => {
					self.handleEvent(data, 'success');
				});
			}
		},
		handleEvent: function(data, type) {
			this.$store.dispatch('addGlobalMessage', {text: data, type: type});
		}
	},
	created() {
		this.isCreator = location.search.length === 0;
		this.initSocketConnection();
	},
}
</script>

<style scoped>
.room{
	height: calc(100vh - 64px);
}
</style>