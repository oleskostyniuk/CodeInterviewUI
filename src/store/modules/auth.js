import Axios from 'axios';
const axios = new Axios({
  baseURL: 'http://localhost:3000'
});

const state = {
	currentUser: {}
};


const mutations = {
	'LOG_IN_USER': function(state, user) {
		state.currentUser = user;
	}
};

const actions = {
	logIn: function({commit} ,{ login, password }) {
		axios.post('/users/auth', { login, password })
			.then(res => {
				commit('LOG_IN_USER', res.data);
			})
			.catch(err => {
				console.log(err.message);
			});
	}
};

export default {
	state,
	mutations,
	actions,
};