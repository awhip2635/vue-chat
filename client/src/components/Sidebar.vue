<template>
    <div class="sidebar">
        <h1>Sockets Chatroom!</h1>
        <div class="row">
            <div class="col-xs-3 col-sm-3 col-md-3">
            </div>
            <div id="currentRoom" class="col-xs-6 col-sm-6 col-md-6 panel">
                <h3>Current Room:</h3>
                <h4>{{currentRoom || 'none'}}</h4>
                <br>
                <div v-if="currentRoom">
                    <div v-for="user in users">
                        <span>{{user}}</span>
                    </div>
                    <span>{{guests}} Guests</span>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3">

            </div>
        </div>
        <div class="row">
<div class="col-xs-3 col-sm-3 col-md-3"></div>
            <div class="panel col-xs-6 col-sm-6 col-md-6" id="availableRooms">
                <h4>Available Rooms:</h4>
                <div v-for="room in rooms">
                    <span class="action" @click="joinRoom(room)">{{room}}</span>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3"></div>
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
        background-color: whitesmoke;
        width: 600px;
        text-align: center;
    }
#currentRoom {
    
}
#availableRooms {
    
}
    
</style>