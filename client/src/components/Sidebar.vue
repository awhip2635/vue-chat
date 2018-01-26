<template>
    <div class="sidebar">
        <h1> Welcome to Sockets Chatroom!</h1>
        <div class="row">
            <div class="col-xs-3 col-sm-3 col-md-3">
            </div>
            <div id="currentRoom" class="col-xs-6 col-sm-6 col-md-6">
                <h3>Current Room:</h3>
                <h4>{{currentRoom || 'none'}}</h4>
                <br>
                <div v-if="currentRoom">
                    <div v-for="user in users">
                        <span>{{user}} is in this room</span>
                    </div>
                    <span>{{guests}} Guest(s) within this room</span>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3">

            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-3 col-md-3"></div>
            <div class="col-xs-12 col-sm-6 col-md-6 panel" id="availableRooms">
                <h4 v-if="currentRoom">Available Rooms:</h4>
                <h4 v-else>Please select a chatroom</h4>
                <div v-for="room in rooms">
                    <span class="action" @click="joinRoom(room)">{{room}}</span>
                </div>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-3"></div>
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
                if (room != this.$store.state.currentRoom) {
                    if (this.$store.state.currentRoom)
                        this.$socket.emit('leaveRoom')
                    this.$socket.emit('joinRoom', room);
                    this.$store.commit('setCurrentRoom', room);
                    this.clearMessages();
                }
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
            },
            guests(state) {
                return state.guests;
            }
        }),
        sockets: {
            joinedRoom(payload) {
                // if (room == this.$store.state.currentRoom) {
                this.$store.dispatch('joinedRoom', payload)
                // }
            },
        }
    }

</script>
<style>
    .panel {
        background-color: burlywood;
        opacity: .65;
        
    }

    #currentRoom {}

    #availableRooms {}
</style>