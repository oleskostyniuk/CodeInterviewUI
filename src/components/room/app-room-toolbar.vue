<template>
	<div>
    <v-toolbar dense>
			<v-toolbar-items class="pl-0 elevation-0" v-if="roomUsers.length !== 0">
        <v-btn text v-for="(user, index) in roomUsers" :key="index"> 
					<v-icon color="success">mdi-account</v-icon>
					{{user.name}}
				</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
		

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-tooltip bottom v-if="isCreator">
					<template v-slot:activator="{ on }">
						<v-btn v-on="on" text @click="copyInviteLink">
							Copy Invite Link
						</v-btn>
					</template>
					<span>{{getInviteLink}}</span>
				</v-tooltip>
        <v-btn @click="leaveRoom" text v-if="isConnected">
          Leave Room
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
export default {
	props: ['inviteLink'],
	data: () => ({

	}),
	sockets: {
		
	},
	computed: {
		roomUsers: function() {
			return this.$store.state.room.room.users;
		},
		getInviteLink: function() {
			return `${location.href}?${this.inviteLink}`;
		},
		isCreator: function() {
			return this.$store.state.room.isCreator;
		},
		isConnected: function(){
			return this.$store.state.room.connected;
		}
	},
	methods: {
		copyInviteLink: function() {
			navigator.clipboard.writeText(this.getInviteLink)
				.then(() => {
					this.$store.dispatch('addGlobalMessage', {text: 'Invite link successfully copied to clipboard', type: 'success'});
				})
				.catch((err) => {this.$store.dispatch('addGlobalMessage', {text: err.message, type: 'error'});})
		},
		leaveRoom: function() {
			this.$socket.emit('exit-room');
		}
	}
}
</script>