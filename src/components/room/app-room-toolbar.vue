<template>
	<div>
    <v-toolbar dense>
			<v-toolbar-items class="pl-0" v-if="roomUsers.length !== 0">
        <v-btn text v-for="(user, index) in roomUsers" :key="index"> 
					<v-icon :color="user.status">mdi-account</v-icon>
					{{user.name}}
				</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
		

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon v-on="on" @click="copyInviteLink">
							<v-icon>mdi-export-variant</v-icon>
						</v-btn>
					</template>
					<span>Copy Invite Link</span>
				</v-tooltip>
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
export default {
	props: ['inviteLink', 'role'],
	data: () => ({

	}),
	sockets: {
		
	},
	computed: {
		roomUsers: function() {
			return [{name: 'Yehor', status: 'success'}, {name: 'Andrey', status: 'warning'}]
		}
	},
	methods: {
		copyInviteLink: function() {
			let inviteUrl = `${location.href}?${this.inviteLink}`;
			navigator.clipboard.writeText(inviteUrl)
				.then(() => {
					this.$store.dispatch('addGlobalMessage', {text: 'Invite link successfully copied to clipboard', type: 'success'});
				})
				.catch((err) => {this.$store.dispatch('addGlobalMessage', {text: err.message, type: 'error'});})
		}
	}
}
</script>