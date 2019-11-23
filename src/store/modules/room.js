const state = {
	room: undefined, // Current room 
	username: undefined, // Username
	status: 'ONLINE', // User status
	rooms: [] // Available rooms in the whole chat
};
const mutations = { 
	joinRoom(){

	}
	// Mutation per action (joinRoom, changeRoom, setRooms, leaveChat, changeStatus)
}
const actions = {
	joinRoom(){
		
	}
	// Here we define all the actions that will get triggered when:
	// joinRoom, changeRoom, setRooms, leaveChat, changeStatus
};

export default {
	state,
	mutations,
	actions
};