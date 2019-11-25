<template>
  <v-card dark>
		<!-- <app-toolbar></app-toolbar> -->
    <v-layout class="room flex-wrap h-100">
      <v-flex xs12 md6>
				<app-code-editor width="100%"
					height="calc(100vh)"
					theme="vs-dark"
					language="javascript"
					:value="code"
					@input="onChange"></app-code-editor>
      </v-flex>

			<v-flex xs12 md6 class="room-panel">
				<app-room-toobar :invite-link="inviteLink" :role="isCreator"></app-room-toobar>
				<app-video-chat></app-video-chat>

				<v-btn v-if="!isCreator" class="primary d-block ml-auto mr-2 mt-5" 
					@click="initConnection">Ready</v-btn>
				
				<span class="mx-2" v-if="isCreator && !isConnected">
						Waiting for opponent
				</span>

				<v-card class="mx-2 mt-3 desc">
					<!-- v-else-if="isConnected" -->
					<v-flex xs12 >
							<v-card-title @click="showDesc = !showDesc" class="py-1 elevation-1">Balls and Funs</v-card-title>	
							<v-textarea v-if="showDesc" :value="desc" id='desc-field' 
									class="desc-field" outlined hide-details @change="descChanged"></v-textarea>
					</v-flex>
				</v-card>
				<v-card height="50%" class="overflow-auto mx-2">
					<v-card-text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</v-card-text>
				</v-card>
			</v-flex>
			
    </v-layout>
  </v-card>
</template>

<script>
import monacoEditor from 'monaco-editor-vue';
import _ from 'lodash';
import videoChat from '../components/app-video-chat.vue';
import roomToolbar from '../components/room/app-room-toolbar.vue';
export default {
	name: 'room',
	data: () => ({
		code: '',
		showDesc: false,
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		isCreator: false,
		inviteLink: null,
		isConnected: false,
	}),
	sockets: {
		'message': function(data) {
			this.handleEvent(data, 'info');
		},
		'new-code': function(data) {
			if(this.code !== data) {
				this.code = data;
			}
		},
		'new-desc': function(data) {
			debugger;

			this.desc = data;
		},
		'partner-connected': function() {
			debugger;
				this.isConnected = true;
		}
	},
	computed: {
		getRoomId: function() {
			return this.isCreator ? this.$store.state.auth.currentUser._id : '';
		}
	},
	components: {
		'app-code-editor': monacoEditor,
		'app-video-chat': videoChat,
		'app-room-toobar': roomToolbar
	},
	methods: {
		onChange: _.debounce(function(value) {
				if(value !== this.code) {
					this.code = value;
					this.$socket.emit('code-changed', value);
				}
		}, 500),
		
		descChanged: _.debounce(function(value) {
			debugger;
				if(value !== this.desc) {
					this.desc = value;
					this.$socket.emit('description-changed', value);
				}
		}, 500), 

		initConnection: function() {
			if(this.isCreator) return;
			const self = this;
			this.$socket.emit('connect-room', this.inviteLink, (data) => {
				if(data) {
					self.isConnected = true;
				}
			});
		},
		handleEvent: function(data, type) {
			this.$store.dispatch('addGlobalMessage', {text: data, type: type});
		},
		checkRole: function() {
			if(location.search.length === 0) {
				if(this.$store.state.auth.currentUser._id) {
					this.inviteLink = this.$store.state.auth.currentUser._id;
					return true;
				}
			} else {
				this.inviteLink = location.search.slice(1);
				console.log('Invite ID', this.inviteLink);
				return false;
			}
		}
	},
	created() {
		const self = this;
		this.$store.dispatch('getMe')
			.then(() => {
				self.isCreator = self.checkRole();
				if(self.isCreator) {
					debugger;
					self.$socket.emit('create-room', self.getRoomId, function (data) {
							self.handleEvent(data, 'success');
						});
				}
			})
		;
	},
}
</script>

<style scoped>
.room{
	height: calc(100vh - 64px);
}
.desc{
	background: #1e1e1e;
}
.desc-field{
	background: #424242;
}
.room-panel{
	display: flex;
	flex-direction: column;
}

</style>

<style>
textarea#desc-field{
	margin-top: 0 !important;
	margin-right: 5px;
}
</style>