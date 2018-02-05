<template>
    <div class="sidebar">
        <h1> Welcome to Sockets Chatroom!</h1>
        <div class="row">
            <div class="col-xs-1 col-sm-1 col-md-1"></div>
            <div class="col-xs-10 col-sm-10 col-md-10 panel" id="availableRooms">
                <h3 v-if="currentRoom">Available Rooms:</h3>
                <h3 v-else>Please select a chatroom</h3>
                <div v-for="room in rooms">
                    <h3 class="action" @click="joinRoom(room)">{{room}}</h3>
                </div>
            </div>
            <div class="col-xs-1 col-sm-1 col-md-1"></div>
            
        </div>
        <div class="row">
            
            <div v-if="currentRoom" id="currentRoom" class="col-xs-12 col-sm-12 col-md-12">
                <h2 >Current Room:</h2>
                <h3>{{currentRoom}}</h3>
                <br>
                <div v-if="currentRoom">
                    <div v-for="user in users">
                        <span>{{user}} is in this room</span>
                    </div>
                    <span>{{guests}} Guest(s) within this room</span>
                </div>
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
        background-color: pink;
        opacity: .85;
        
        
    }

    #currentRoom {}

    #availableRooms {}
</style>