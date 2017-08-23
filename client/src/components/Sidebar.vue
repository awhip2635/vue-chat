<template>
	<div class="sidebar panel panel-default">
		<div id="currentRoom" class="panel panel-default">
			<h3>Current Room:</h3>
			<h4>{{currentRoom || 'none'}}</h4>
			<br>
			<div v-if="currentRoom" v-for="user in users">
				<span>{{user}}</span>
			</div>
		</div>
		<div id="availableRooms">
			<div v-for="room in rooms">
				<span class="action" @click="joinRoom(room)">{{room}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: "sidebar",
		data() {
			return {

			}
		},
		methods: {
			joinRoom(room) {
				if(room!= this.$store.state.currentRoom){
				this.$socket.emit('joinRoom', room);
				this.clearMessages()}
			},
			clearMessages() {
				this.$store.dispatch('clearMessages');
			}
		},
		computed: mapState({
			rooms(state) {
				return state.rooms;
			},
			currentRoom(state) {
				return state.currentRoom;
			},
			users(state) {
				return Object.keys(state.users);
			}
		}),
		socket: {
			// joinedRoom(room) {
			// 	// if (room == this.$store.state.currentRoom) {
			// 		console.log('joined room')

			// 		this.$store.dispatch('joinedRoom')
			// 	// }
			// }
		}
	}

</script>