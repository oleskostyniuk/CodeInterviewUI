import axios from '../axios.js';


const state = {
	room: { name: '', users: [], tasks: [] },  
	isCreator: false,
	codeOutput: null,
	connected: false
};
const mutations = { 
	'SET_ROOM': function(state, room) {
		state.room = room;
		state.connected = true;
	},
	'SET_CODE_OUTPUT': function(state, output) {
		state.codeOutput = output;
	},
	'SET_USER_NAME': function(state, name) {
		state.room.users.push({name: name});
	},
	'SET_IS_CREATOR': function(state, isCreator) {
		state.isCreator = isCreator;
	},
	'ADD_CONNECTION': function(state, name) {
		state.room.users.push({name: name});
	},
	'REMOVE_CONNECTION': function(state) {
		state.room.users.pop();
	},
	'DISCONNECT_ROOM': function(state) {
		state.room = { name: '', users: [], tasks: [] };
		state.codeOutput = null;
		state.connected = false;
	}
}
const actions = {
	'SOCKET_SET_ROOM': function({commit}, room) {
		commit('SET_ROOM', room);
	},
	sendCode: function({commit}, code) {
		return axios.post('/code', code)
			.then(res => {
				commit('SET_CODE_OUTPUT', res.data);
				return res.data;
			})
			.catch(err => {console.log(err.message);})
	},
	setName: function({commit}, name) {
		commit('SET_USER_NAME', name);
		
	},
	setCreator: function({commit}, isCreator) {
		commit('SET_IS_CREATOR', isCreator);
	},
	addConnection: function({commit}, name) {
		commit('ADD_CONNECTION', name);
	},
	removeConnection: function({commit}) {
		commit('REMOVE_CONNECTION');
	},
	disconnectRoom: function({commit}) {
		commit('DISCONNECT_ROOM');
	}
};

export default {
	state,
	mutations,
	actions
};