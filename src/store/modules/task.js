import axios from '../axios.js';
// import Vue from 'vue';
const state = {

};


const mutations = {
};

const actions = {
	getTasks: function() {
		return axios.get('/tasks/allTasks')
			.then(res => {
				return res.data;
			})
	},
	getMyTasks: function() {
		let token = JSON.parse(localStorage.getItem('user')).userJwt;
		return axios.get('/tasks/myTasks', { headers: {'x-auth-token': token}})
			.then(res => {
				return res.data;
			})
	},
	createTask: function(context, newTask) {
		let token = JSON.parse(localStorage.getItem('user')).userJwt;
		return axios.put('/tasks/task', {
				title: newTask.title,
				description: newTask.description,
				languageId:newTask.languageId
		}, { headers: {'x-auth-token': token}})
		.then(res => {
				context.dispatch('addGlobalMessage', {text: 'Task created', type: 'success'});
				return res.data;
		})
	},
	editTask: function(context, editedTask) {
		return axios.post(`/tasks/task/${editedTask._id}`,
		{

		}, { headers: {'x-auth-token': context.state.token}})
			.then(res => {
					return res.data;
			})
	}
};


export default {
	state,
	mutations,
	actions
};