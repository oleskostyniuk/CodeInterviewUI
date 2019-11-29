import axios from '../axios.js';


const state = {
	room: { name: '', users: [], tasks: [], language_id: null },  
	isCreator: false,
	codeOutput: null,
	connected: false,
	languagesList: []
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
	},
	'SET_LANG_LIST': function(state, langList) {
		state.languagesList = langList;
	}
}
const actions = {
	'SOCKET_SET_ROOM': function({commit}, room) {
		commit('SET_ROOM', room);
	},
	sendCode: function({commit}, code) {
		return axios.post('/judge/code', code)
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
	},
	getLanguagesList: function({commit}) {
		return axios.get('https://api.judge0.com/languages')
			.then(res => {
				commit('SET_LANG_LIST', res.data);
			})
	}
};

const getters = {
	getLanguageById: state => {
    return state.languagesList.length && state.room.language_id ? state.languagesList.find(lang => lang.id === state.room.language_id) : null;
  }
}

export default {
	state,
	mutations,
	actions,
	getters
};