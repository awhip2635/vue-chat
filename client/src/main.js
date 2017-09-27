import Vue from 'vue';
import App from './App.vue';
import VueSocketio from 'vue-socket.io';
// import wysiwyg from 'vue-wysiwyg'


import store from './store'

// import "vue-wysiwyg/dist/vueWysiwyg.css"
// Vue.use(wysiwyg, {})
Vue.use(VueSocketio, '//just-something.herokuapp.com');
// Vue.use(VueSocketio, '192.168.0.32:3000');

// 
new Vue({
	el: '#app',
	store,
	components: { App },
	render: h => h(App)
})
