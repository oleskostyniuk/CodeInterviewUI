import axios from '../axios.js';
import Vue from 'vue';
const state = {
	currentUser: {},
	token: null,
	messages: []
};


const mutations = {
	'LOG_IN_USER': function(state, userJwt) {
		state.token = userJwt;
		let user = {userJwt, expirationDate: new Date().getTime() + 1000*60*30 }
		localStorage.setItem('user', JSON.stringify(user));
	},
	'RELOG_USER': function(state, token) {
		state.token = token;
	},
	'SET_ME': function(state, me) {
		Vue.set(state, 'currentUser', me);
	},
	'LOG_OUT': function(state) {
		state.currentUser = {};
		state.token = null;
	},
	'ADD_MESSAGE': function(state, err) {
		state.messages.push(err);
		console.log(err);
	}
};

const actions = {
	logIn: function({commit, dispatch} ,{ email, password }) {
		axios.post('/users/auth', { email, password })
			.then(res => {
				commit('LOG_IN_USER', res.data);
				dispatch('getMe');
			})
			.catch(() => {});
	},
	getMe: function(context) {
			axios.get('/users/me', { headers: {'x-auth-token': context.state.token}})
				.then(res => {
					context.commit('SET_ME', res.data);
				})
	},
	reLogUser: function({commit, dispatch}, jwt) {
		commit('RELOG_USER', jwt.userJwt);
		dispatch('getMe');
	},
	logOut: function({commit}) {
		commit('LOG_OUT');
	},
	registration: function({commit}, form) {
		return axios.post('/users/register', {
			email: form.email,
			password: form.password,
			firstName: form.firstName,
			lastName: form.lastName,
			company: form.company
		}).then(res => {
			return res.data;
		}).catch(err => {
			commit('ADD_MESSAGE', err);
		});
	}
};


export default {
	state,
	mutations,
	actions
};