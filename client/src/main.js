import Vue from 'vue';
import App from './App.vue';
import VueSocketio from 'vue-socket.io'

import store from './store'

// Vue.use(VueSocketio, '192.168.0.27:3000');
Vue.use(VueSocketio, '//localhost:3000')

// 
new Vue({
	el: '#app',
	store,
	// components: { App },
	render: h => h(App)
})
