import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'http://localhost:3000'
});

const state = {
	currentUser: {},
	token: null
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
		this.state.currentUser = me;
	},
	'LOG_OUT': function(state) {
		state.currentUser = {};
		state.token = null;
	}
};

const actions = {
	logIn: function({commit, dispatch} ,{ login, password }) {
		return axios.post('/users/auth', { email: login, password })
			.then(res => {
				commit('LOG_IN_USER', res.data);
				dispatch('getMe');
			})
			.catch(err => {
				console.log(err.message);
			});
	},
	getMe: function(context) {
			return axios.get('/users/me', { headers: {'x-auth-token': context.state.token}})
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
	}
};

export default {
	state,
	mutations,
	actions,
};