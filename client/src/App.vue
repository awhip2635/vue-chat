<template>
	<div id="app">
		<div class="container">
			<div class="row">
				<div class="col-xs-8">
					<div v-if="currentRoom && !joined" class="text-center">
						<form @submit.prevent="login">
							<div class="form-group">
								<input type="text" maxlength="12" class="form-control input-lg text-center" placeholder="Name" v-model="name">
							</div>
							<button class="btn btn-primary btn-lg">Login Chat</button>
						</form>
					</div>
					<div v-if="currentRoom">
						<div class="chat">
							<div class="row" v-for="item in messages">
								<div class="col-sm-2 text-right">
									<span class="name">{{ item.user }}</span>
								</div>
								<div class="col-sm-10">
									<span class="message" v-html="item.message"></span>
								</div>
							</div>
						</div>
						<form v-if="joined" @submit.prevent="send">
							<textarea id="message-textarea" @keydown="inputHandler" maxlength="140" type="text" placeholder="Enter message..." v-model="message"></textarea>
							<div class="text-center">
								<button class="btn btn-primary btn-lg" type="button" @click="leave">Leave Chat</button>
								<button class="btn btn-primary btn-lg" type="button" @click="send">Submit</button>
								<button class="btn btn-primary btn-lg" type="button" @click="sendImg">Submit-Img</button>
								<button class="btn btn-primary btn-lg" type="button" @click="sendLink">Submit-Link</button>
							</div>
						</form>
						<div class="text-center">
							<button class="btn btn-primary btn-lg" type="button" @click="leave">Leave Room</button>
							<button class="btn btn-primary btn-lg" type="button" @click="clearMessages">Clear Messages</button>
						</div>
					</div>
				</div>
				<div class="col-xs-4">
					<sidebar></sidebar>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import sidebar from './components/Sidebar.vue';

	export default {
		name: 'app',
		components: {
			sidebar
		},
		data() {
			return {
				name: '',
				message: '',
				myHTML: ''
			}
		},
		computed: mapState({
			joined(state) {
				return state.joined;
			},
			messages(state) {
				return state.messages;
			},
			currentRoom(state) {
				return state.currentRoom;
			},
			images(state) {
				return state.images
			}
		}),
		methods: {
			inputHandler(e) {
				if ((e.keyCode == 13 || e.keyCode == 10) && e.ctrlKey) {
					this.send();
				}
			},
			login() {
				if (this.name.trim()) {
					this.$store.dispatch('setJoined', true);
					this.$socket.emit('login', this.name.trim());
				}
			},
			leave(user) {
				// this.$store.dispatch('setJoined', false);
				this.$store.dispatch('leftRoom', user ? user : 'Guest');
				this.$socket.emit('leaveRoom');
				this.clearMessages();
			},
			send() {
				if (this.message.trim()) {
					this.$socket.emit('message', this.message.trim());
					this.message = '';
				}
			},
			sendImg: function () {
				if (this.message) {
					this.$socket.emit('image', this.message);
					this.message = ''
				}
			},
			sendLink: function () {
				if (this.message) {
					this.$socket.emit('link', this.message);
					this.message = ''
				}
			},
			clearMessages() {
				this.$store.dispatch('clearMessages');
			}
		},
		sockets: {
			loggedIn(payload) {
				var data = { user: payload.user, message: 'Shed their guest status.' };
				this.$store.dispatch('addMessage', data);
				this.$store.dispatch('setUsers', { users: payload.users, guests: payload.guests })
			},
			left(payload) {
				var data = { user: payload.user ? payload.user : 'Guest', message: 'Has left the chat.' };
				this.$store.dispatch('addMessage', data);
				this.$store.dispatch('setUsers', { users: payload.users, guests: payload.guests })
			},
			message(data) {
				this.$store.dispatch('addMessage', data);
			},
			image: function (img) {
				this.$store.dispatch('addImage', img);
			},
			link: function (url) {
				this.$store.dispatch('addLink', url);
			}
		}
	}

</script>
<style>
	.action {
		cursor: pointer;
	}
</style>
<style scoped>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}

	.chat {
		border: 1px solid #ccc;
		border-radius: 6px;
		padding: 10px;
		margin-bottom: 10px;
		max-height: 500px;
		overflow-y: auto;
		overflow-x: hidden;
		max-width: 75vw;
		overflow-y: auto;
	}

	.name {
		font-size: 15px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.message {
		border-radius: 5px !important;
		background: #E0EDFF;
		padding: 5px 12px;
		font-size: 15px;
	}

	.row {
		margin-bottom: 15px;
	}

	#message-textarea {
		width: 80%;
		max-width: 100%;
		max-height: 100px;
	}

	img {
		width: 200px;
		height: 200px;
	}
</style>