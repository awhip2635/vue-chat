<template>
	<div>
		<div v-if="!joined" class="text-center">
			<form>
				<div class="form-group">
					<input type="text" max="12" class="form-control input-lg text-center" placeholder="Name" v-model="name">
				</div>
				<button class="btn btn-primary btn-lg" type="button" @click="join">Join Chat</button>
			</form>
		</div>
		<div v-if="joined">
			<div class="chat">
				<div class="row">
					<div v-for="item in messages">

						<div class="col-sm-2 text-right">
							<span class="name" v-html="item.user"></span>
						</div>
						<div class="col-sm-10">
							<span class="message" v-html="item.message"></span>
						</div>
					</div>
					<!-- <div v-for="image in images">
						<span v-html="image"></span>
					</div> -->
				</div>
			</div>
			<!-- <input type="text" v-model="message" placeholder="message">
			<button type="button" @click="send">Submit</button> -->
			<div class="text-center">
				<form>
					<div class="form-group">
						<input type="text" max="12" class="form-control input-lg text-center" placeholder="Message" v-model="message">
					</div>
				</form>
				<!-- <wysiwyg v-model="myHTML" /> -->
			</div>
			<div class="text-center">
				<button class="btn btn-primary btn-lg" type="button" @click="leave">Leave Chat</button>
				<button class="btn btn-primary btn-lg" type="button" @click="send">Submit</button>
				<button class="btn btn-primary btn-lg" type="button" @click="sendImg">Submit-Img</button>
				<button class="btn btn-primary btn-lg" type="button" @click="sendLink">Submit-Link</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'app',
		data: function () {
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
			images(state) {
				return state.images
			}
		}),
		methods: {
			join: function () {
				if (this.name) {
					this.$store.dispatch('setJoined', true);
					this.$socket.emit('join', this.name);
				}
			},
			leave: function () {
				this.$store.dispatch('setJoined', false);
				this.$store.dispatch('clearMessages');
				this.$socket.emit('leave')
			},
			send: function () {
				if (this.message) {
					this.$socket.emit('message', this.message);
					this.message = ''
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
			}
		},
		sockets: {
			user: function (name) {
				var data = { user: name, message: 'Has joined the chat.' };
				this.$store.dispatch('addMessage', data);
			},
			left: function (name) {
				var data = { user: name, message: 'Has left the chat.' };
				this.$store.dispatch('addMessage', data);
			},
			message: function (data) {
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

	img {
		width: 200px;
		height: 200px;
		
	}
</style>