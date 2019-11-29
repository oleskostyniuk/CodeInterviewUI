<template>
	<v-flex xs12>
		<v-expansion-panels accordion class="my-1">
			<v-expansion-panel>
				<v-expansion-panel-header>Task</v-expansion-panel-header>
				<v-expansion-panel-content>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
		
	
		<v-layout>	
		<v-flex xs12 class="pa-0 flex-column mb-2" d-flex>
			<v-toolbar height="30px" max-height="30" class="elevation-0">
				<div class=" caption">
					<span v-if="currentOutput && currentOutput.time">Time: {{currentOutput.time}}</span>
					<span class="ml-2" v-if="currentOutput && currentOutput.memory">Memory: {{currentOutput.memory}}</span>
					<span class="ml-2" v-if="currentOutput && currentOutput.status">Status: 
					<span :class="currentOutput.stderr ? 'error--text' : 'success--text'">{{currentOutput.status.description}}</span>
					</span>
				</div>
				
				<v-spacer></v-spacer>
				<span v-if="getLanguageName" class="">{{getLanguageName.name}}</span>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn text small @click="compileCode" :loading="isCompiling">
							<v-icon color="success">mdi-play</v-icon>
						</v-btn>
					</template>
					<span>Run Code</span>
				</v-tooltip>
				
				<v-tooltip bottom v-if="output !== ''">
					<template v-slot:activator="{ on }">
						<v-btn text small @click="clearConsole">
							<v-icon color="warning">mdi-autorenew</v-icon>
						</v-btn>
					</template>
					<span>Run Code</span>
				</v-tooltip>
			</v-toolbar>
			<code class="code-output px-3 d-block" ref="codeOutput" v-html="output"></code>
		</v-flex>
		</v-layout>

		

	</v-flex>
</template>

<script>
export default {
	props: ['code'],
	data: () => ({
		tab: 1,
		currentOutput: null,
		output: '',
		isCompiling: false
	}),
	sockets: {
		'compile-output': function(data) {
			this.isCompiling = false;
			this.currentOutput = data;
			if(data.stderr) {
				this.output = this.output + '\n-->: ' + data.stderr;						
			} else {
				this.output = this.output + '\n-->: ' + '<span class="white--text">' + data.stdout + '</span>';
			}
			this.$nextTick(() => {
				this.$refs.codeOutput.scrollTop = this.$refs.codeOutput.scrollHeight; 
			});
		},
		'start-compiling': function() {
			this.isCompiling = true;
		}
	},
	computed: {
		getLanguageName: function() {
			return this.$store.getters.getLanguageById;
		}
	},
	methods: {
		clearConsole: function() {
			this.output = '';
		},
		compileCode: function () {
			let data = {
				source_code: this.code,
				language_id: 29
			}
			this.$socket.emit('compile-code', data);
		}
	}
}
</script>

<style scoped>
.code-output{
	width: 100%;
	height: 63vh;	
	background: #2e2e2e;
	overflow-y: auto;
	border-radius: 0;
}
</style>
<style>
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 30px !important;
}
</style>