import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	joined: false,
	name: '',
	messages: [],
	rooms: ['BCW', 'Shooting the breeze'],
	currentRoom: '',
	users: {}
};

const mutations = {
	setJoined(state, payload) {
		state.joined = payload;
	},
	addMessage(state, payload) {
		state.messages.push(payload);
	},
	clearMessages(state) {
		state.messages = []
	},
	setCurrentRoom(state, room) {
		state.currentRoom = room;
	},
	leftRoom(state) {
		state.currentRoom = '';
	},
	setUsers(state, users) {
		if(users)
		state.users=users;
	}
	
};

const actions = {
	setJoined({ commit, dispatch }, payload) {
		commit('setJoined', payload);
	},
	addMessage({ commit, dispatch }, payload) {
		commit('addMessage', payload);
	},
	clearMessages({ commit, dispatch }) {
		commit('clearMessages');
	},
	joinedRoom({ commit, dispatch }, payload) {
		commit('setCurrentRoom', payload.room);
		console.log(payload)
		
		commit('addMessage', {user: (payload.user ? payload.user: "Guest"), message: "has joined the room"})
		commit('setUsers', payload.users)
	},
	leftRoom({ commit, dispatch }, user) {
		commit('leftRoom');
		commit('addMessage', { user: user, message: 'Has left the room' })
	}
};

const getters = {
	messages: (state) => {
		return state.messages;
	}
};

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	strict: true
});