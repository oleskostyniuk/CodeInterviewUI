<template>
	<v-dialog persistent v-model="showModal" width="500">
		<v-card dark>
			<v-card-actions>
				<v-btn @click="close">Close</v-btn>
				<v-btn color="success" @click="createRoom">Create</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data: () => ({
		showModal: true
	}),
	methods: {
		close() {
			this.$emit('close');
		},
		createRoom: function() {
			this.$router.push({name: 'room'});
		}
	}
}
</script>