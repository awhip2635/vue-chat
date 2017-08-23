import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	joined: false,
	name: '',
	messages: [],
	images: ['<img src="//placehold.it/200x200">']
};

const mutations = {
	setJoined(state, payload) {
		state.joined = payload;
	},
	addMessage(state, payload) {
		state.messages.push(payload);
	},
	addImage(state, payload) {
		state.messages.push({user: payload.user, message: `<img src="${payload.message}">`});
		// console.log(state.messages)
	},
	addLink(state, payload) {
		state.messages.push({user: payload.user, message: `<a href="${payload.message}" target="_blank">${payload.message}</a>`});
		// console.log(state.messages)
	},
	clearMessages(state) {
		state.messages = []
	}
};

const actions = {
	setJoined({ commit, state }, payload) {
		commit('setJoined', payload);
	},
	addMessage({ commit, state }, payload) {
		commit('addMessage', payload);
	},
	addImage({ commit, state }, payload) {
		commit('addImage', payload);
	},
	addLink({ commit, state }, payload) {
		commit('addLink', payload);
	},
	clearMessages({ commit, state }) {
		commit('clearMessages')
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