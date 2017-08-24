import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	joined: false,
	name: '',
	messages: [],
	rooms: ['BCW', 'Shooting the breeze'],
	currentRoom: '',
	users: {},
	images: ['<img src="//placehold.it/200x200">'],
	guests: 0
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
	},
	addImage(state, payload) {
		state.messages.push({user: payload.user, message: `<img src="${payload.message}">`});
	},
	addLink(state, payload) {
		state.messages.push({user: payload.user, message: `<a href="${payload.message}" target="_blank">${payload.message}</a>`});
	},
	setGuests(state, guests) {
		state.guests = guests;
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
		commit('addMessage', {user: (payload.user ? payload.user: "Guest"), message: "has joined the room"})
		commit('setUsers', payload.users)
		commit('setGuests', payload.guests)
	},
	leftRoom({ commit, dispatch }, user) {
		commit('leftRoom');
		commit('addMessage', { user: user, message: 'Has left the room' })
	},
	addImage({ commit, state }, payload) {
		commit('addImage', payload);
	},
	addLink({ commit, state }, payload) {
		commit('addLink', payload);
	},
	setUsers({commit, dispatch}, payload) {
		commit('setUsers', payload.users)
		commit('setGuests', payload.guests)
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