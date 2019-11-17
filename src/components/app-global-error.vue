<template>
	<div class="global-error-wrap">
		<v-alert max-width="50vw" :type="message.type"
			v-for="(message, index) in getMessages" :key="index">{{message.text}}
				<template v-slot:close>
					<v-icon class="ml-1" @click="deleteMessage(index)">mdi-close</v-icon>
				</template>
			</v-alert>
	</div>
</template>

<script>
export default {
	computed: {
		getMessages: {
			get() {
				return this.$store.state.globalMessages;
			}
		}
	},
	methods: {
		deleteMessage(index) {
			this.$store.dispatch('deleteGlobalMessage', index);
		},
	}
}
</script>

<style scoped>
.global-error-wrap{
	width: 100vw;
	z-index: 9999;
	height: 0;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
</style>