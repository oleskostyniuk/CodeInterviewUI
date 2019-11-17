<template>
	<v-dialog v-model="showModal" width="1000">
		<v-card dark>
			<v-row class="mx-0">
				<v-flex xs5 class="pa-4">
					<v-card-title>Create New Task</v-card-title>
					<v-text-field v-model="newTask.title" @input="errors.title = ''"
						outlined label="Title" :error-messages="errors.title"></v-text-field>
					<v-text-field v-model="newTask.description" @input="errors.description = ''"
						outlined label="Description" :error-messages="errors.description"></v-text-field>
					<v-select :items=[1,2,3] label="Language ID" outlined v-model="newTask.language_id"
						:error-messages="errors.language_id"></v-select>
				</v-flex>
				<v-flex xs1></v-flex>
				<v-divider vertical class="mx-0"></v-divider>
				<v-flex xs4 class="offset-1 py-4 overflow-auto">
					<div class="d-flex justify-around" v-for="(item, index) in newTask.test"
						:key="index">
						<v-text-field v-model='item.stdin' outlined></v-text-field>
						<v-text-field class="ml-3" v-model='item.stdout' outlined></v-text-field>
					</div>
					<div class="d-flex justify-center">
						<v-btn small color="success" width="100" @click="addNewTest"><v-icon>mdi-plus</v-icon></v-btn>
					</div>
				</v-flex>	
			</v-row>			
			
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn @click="close">Close</v-btn>
				<v-btn color="success" @click="addNewTask">Create</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data: () => ({
		showModal: true,
		newTask: {
			title: '',
			description: '',
			language_id: null,
			test: [{ stdin: null, stdout: null }]
		},
		errors: {}
	}),
	methods: {
		validate: function() {
			let errors = {};
			if(this.newTask.title.length < 1) {
				errors.title = 'Enter Title';
			}
			if(this.newTask.description.length < 1) {
				errors.description = 'Enter Description';
			}
			if(!this.newTask.language_id) {
				errors.language_id = 'Choose language_id';
			}
			if(Object.entries(errors).length > 0) {
				this.errors = errors;
				return false
			} else {
				return true;
			}
		},
		addNewTest: function() {
			this.newTask.test.push({ stdin: null, stdout: null });
		},
		addNewTask: function() {
			if(this.validate()) {
				let self = this;
				this.$store.dispatch('createTask', this.newTask)
					.then(() => {
						self.close();
					});
			}
		},
		close: function() {
			this.$emit('close');
			this.clear();
		},
		clear: function() {
			this.newTask = {
				title: '',
				description: '',
				language_id: null,
				test: [{ stdin: null, stdout: null }]
			}
		}
	}
}
</script>