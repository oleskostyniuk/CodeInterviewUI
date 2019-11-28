<template>
	<div class="w-100">
		<v-toolbar height="30" class="elevation-0">
			<v-spacer></v-spacer>
			<v-btn text small @click="compileCode">
				<v-icon color="success">mdi-play</v-icon>
			</v-btn>
		</v-toolbar>

		<code class="code-output pa-3" v-html="output"></code>
	</div>
</template>

<script>
export default {
	props: ['code'],
	data: () => ({
		output: '',
	}),
	methods: {
		compileCode: function () {
			this.$store.dispatch('sendCode', {
				"source_code": this.code,
				"language_id": 29,
			})
				.then(data => {
					this.output = this.output + '\n\nOutput: ' + data.stdout;
				});
		}
	}
}
</script>

<style scoped>
.code-output{
	width: 100%;
	height: 50vh;
	background: #2e2e2e;
}
</style>