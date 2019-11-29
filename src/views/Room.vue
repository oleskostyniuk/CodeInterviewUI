<template>
  <v-card dark class="desc">
		<!-- <app-toolbar></app-toolbar> -->
		<app-socket-mixin></app-socket-mixin>
		<app-room-modal @name-setted="setName($event)" :dialog="showEnterDialog"></app-room-modal>
		<app-room-finish :dialog="showFinishDialog"></app-room-finish>
		<app-room-toobar :invite-link="inviteLink"></app-room-toobar>
		<v-layout class="room flex-wrap">
      <v-flex xs12 d-flex md6>
				<app-code-editor width="100%"
					height="100%"
					theme="vs-dark"
					language="javascript"
					:value="code"
					@input="onChange"></app-code-editor>
      </v-flex>

			<v-flex xs12 d-flex md6 class="room-panel" :style="{'justify-content': !isConnected ? 'center': ''}">
				<app-video-chat @peer-id="setInviteLink($event)"></app-video-chat>

				<div class="mx-auto px-5 loading-circ" v-if="isCreator && !isConnected" loading>
					<v-progress-circular
						:size="70"
						:width="7"
						class="mx-auto d-flex"
						color="orange"
						indeterminate
					></v-progress-circular>
						<span class="d-block my-3 title">Waiting for opponent</span>
				</div>
			
				<v-layout v-else-if="isConnected" wrap class="mx-2 desc">
					<app-code-output :code="code"></app-code-output>
				</v-layout>
			</v-flex>
			
    </v-layout>
  </v-card>
</template>

<script>
import monacoEditor from 'monaco-editor-vue';
import _ from 'lodash';
import videoChat from '../components/app-video-chat.vue';
import roomToolbar from '../components/room/app-room-toolbar.vue';
import socketMixin from '../components/room/room-socket-mixin.vue';
import roomModal from '../components/room/app-room-enter.vue';
import roomFinish from '../components/room/app-room-finish.vue';
import codeOutput from '../components/room/app-code-output.vue';

export default {
	name: 'room',
	data: () => ({
		name: '',
		code: '',
		showDesc: false,
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		inviteLink: null,
		isConnected: false,
		showEnterDialog: false,
		showFinishDialog: false
	}),
	sockets: {
		'new-code': function(data) {
			if(this.code !== data) this.code = data;
		},
		'new-desc': function(data) {
			this.desc = data;
		},
		'partner-connected': function() {
			this.isConnected = true;
			if(this.isCreator) {
				this.$socket.emit('send-room-info', this.$store.state.room.room);
			}
		},
		'room-info': function(data) {
			this.$store.dispatch('SOCKET_SET_ROOM', data);
		},
		'send-username': function(name) {
			this.$store.dispatch('addConnection', name);
		},
		'partner-disconnected': function() {
			this.isConnected = false;
			this.$store.dispatch('removeConnection');
			this.showFinishDialog = true;
		},
		'disconnect': function() {
			this.handleEvent('Disconnected', 'info');
			this.$store.dispatch('disconnectRoom');
			this.showFinishDialog = true;
		},
	},
	computed: {
		getRoomId: function() {
			return this.isCreator ? this.$store.state.auth.currentUser._id : '';
		},
		isCreator: function() {
			return this.$store.state.room.isCreator;
		}
	},
	components: {
		'app-code-editor': monacoEditor,
		'app-video-chat': videoChat,
		'app-room-toobar': roomToolbar,
		'app-socket-mixin': socketMixin,
		'app-room-modal': roomModal,
		'app-room-finish': roomFinish,
		'app-code-output': codeOutput
	},
	methods: {
		setName: function(name) {
			this.name = name;
			this.showEnterDialog = false;
			this.$store.dispatch('setName', this.name);
			this.initConnection();
		},
		onChange: _.debounce(function(value) {
				if(value !== this.code) {
					this.code = value;
					this.$socket.emit('code-changed', value);
				}
		}, 500),
		
		descChanged: _.debounce(function(value) {
				if(value !== this.desc) {
					this.desc = value;
					this.$socket.emit('description-changed', value);
				}
		}, 500), 

		initConnection: function() {
			if(this.isCreator) return;
			const self = this;
			this.$socket.emit('connect-room', this.inviteLink, this.name, (data) => {
				if(data) {
					self.isConnected = true;
				}
			});
		},
		handleEvent: function(data, type) {
			this.$store.dispatch('addGlobalMessage', {text: data, type: type});
		},
		setInviteLink: function(link) {
			if(this.checkRole()) {
				this.inviteLink = link;
				const self = this;
				this.$socket.emit('create-room', this.inviteLink, function() {
					self.handleEvent('Room created', 'success');
				});
				this.$store.dispatch('setCreator', true);
				let room = {name: this.inviteLink, users: [{name: this.$store.state.auth.currentUser.firstName}], language_id: 29 };
				this.$store.dispatch('SOCKET_SET_ROOM', room);
			}
		},
		checkRole: function() {
			if(location.search.length === 0) {
				if(this.$store.state.auth.currentUser._id) {
					return true;
				}
			} else {
				this.inviteLink = location.search.slice(1);
				console.log('Invite ID', this.inviteLink);
				return false;
			}
		},
	},
	async created() {
		const self = this;
		if(!self.checkRole()) {
			self.showEnterDialog = true;
		}
	},
}
</script>

<style scoped>
.room{
	height: 100vh;
	overflow: hidden;
	max-height: calc(100vh - 30px);
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
	border-left: 5px solid black;
}
.loading-circ{
	/* margin-top: 45%; */
}
</style>

<style>
textarea#desc-field{
	margin-top: 0 !important;
	margin-right: 5px;
}
</style>