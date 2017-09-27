webpackJsonp([1],{"+TDb":function(s,t,e){"use strict";var n=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-xs-8"},[s.currentRoom&&!s.joined?e("div",{staticClass:"text-center"},[e("form",{on:{submit:function(t){t.preventDefault(),s.login(t)}}},[e("div",{staticClass:"form-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:s.name,expression:"name"}],staticClass:"form-control input-lg text-center",attrs:{type:"text",maxlength:"12",placeholder:"Name"},domProps:{value:s.name},on:{input:function(t){t.target.composing||(s.name=t.target.value)}}})]),s._v(" "),e("button",{staticClass:"btn btn-primary btn-lg"},[s._v("Login Chat")])])]):s._e(),s._v(" "),s.currentRoom?e("div",[e("div",{staticClass:"chat"},s._l(s.messages,function(t){return e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-2 text-right"},[e("span",{staticClass:"name"},[s._v(s._s(t.user))])]),s._v(" "),e("div",{staticClass:"col-sm-10"},[e("span",{staticClass:"message",domProps:{innerHTML:s._s(t.message)}})])])})),s._v(" "),s.joined?e("form",{on:{submit:function(t){t.preventDefault(),s.send(t)}}},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:s.message,expression:"message"}],attrs:{id:"message-textarea",maxlength:"140",type:"text",placeholder:"Enter message..."},domProps:{value:s.message},on:{keydown:s.inputHandler,input:function(t){t.target.composing||(s.message=t.target.value)}}}),s._v(" "),e("div",{staticClass:"text-center"},[e("button",{staticClass:"btn btn-primary btn-lg",attrs:{type:"button"},on:{click:s.leave}},[s._v("Leave Chat")]),s._v(" "),e("button",{staticClass:"btn btn-primary btn-lg",attrs:{type:"button"},on:{click:s.send}},[s._v("Submit")]),s._v(" "),e("button",{staticClass:"btn btn-primary btn-lg",attrs:{type:"button"},on:{click:s.sendImg}},[s._v("Submit-Img")]),s._v(" "),e("button",{staticClass:"btn btn-primary btn-lg",attrs:{type:"button"},on:{click:s.sendLink}},[s._v("Submit-Link")])])]):s._e(),s._v(" "),e("div",{staticClass:"text-center"},[e("button",{staticClass:"btn btn-primary btn-lg",attrs:{type:"button"},on:{click:s.leave}},[s._v("Leave Room")]),s._v(" "),e("button",{staticClass:"btn btn-primary btn-lg",attrs:{type:"button"},on:{click:s.clearMessages}},[s._v("Clear Messages")])])]):s._e()]),s._v(" "),e("div",{staticClass:"col-xs-4"},[e("sidebar")],1)])])])},a=[],i={render:n,staticRenderFns:a};t.a=i},BW2B:function(s,t){},"Dn+C":function(s,t,e){"use strict";var n=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"sidebar panel panel-default"},[e("div",{staticClass:"panel panel-default",attrs:{id:"currentRoom"}},[e("h3",[s._v("Current Room:")]),s._v(" "),e("h4",[s._v(s._s(s.currentRoom||"none"))]),s._v(" "),e("br"),s._v(" "),s.currentRoom?e("div",[s._l(s.users,function(t){return e("div",[e("span",[s._v(s._s(t))])])}),s._v(" "),e("span",[s._v(s._s(s.guests)+" Guests")])],2):s._e()]),s._v(" "),e("div",{attrs:{id:"availableRooms"}},s._l(s.rooms,function(t){return e("div",[e("span",{staticClass:"action",on:{click:function(e){s.joinRoom(t)}}},[s._v(s._s(t))])])}))])},a=[],i={render:n,staticRenderFns:a};t.a=i},M93x:function(s,t,e){"use strict";function n(s){e("Pxcp"),e("BW2B")}var a=e("xJD8"),i=e("+TDb"),o=e("VU/8"),r=n,c=o(a.a,i.a,r,"data-v-59c95520",null);t.a=c.exports},NHnr:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("7+uW"),a=e("M93x"),i=e("hMcO"),o=e.n(i),r=e("olkN");n.a.use(o.a,"//just-something.herokuapp.com"),new n.a({el:"#app",store:r.a,components:{App:a.a},render:function(s){return s(a.a)}})},Pxcp:function(s,t){},f3NK:function(s,t,e){"use strict";var n=e("fZjL"),a=e.n(n),i=e("NYxO");t.a={name:"sidebar",data:function(){return{}},methods:{joinRoom:function(s){s!=this.$store.state.currentRoom&&(this.$store.state.currentRoom&&this.$socket.emit("leaveRoom"),this.$socket.emit("joinRoom",s),this.$store.commit("setCurrentRoom",s),this.clearMessages())},clearMessages:function(){this.$store.dispatch("clearMessages")}},computed:e.i(i.a)({rooms:function(s){return s.rooms},currentRoom:function(s){return s.currentRoom},users:function(s){return a()(s.users)},guests:function(s){return s.guests}}),sockets:{joinedRoom:function(s){this.$store.dispatch("joinedRoom",s)}}}},lZ5c:function(s,t,e){"use strict";var n=e("f3NK"),a=e("Dn+C"),i=e("VU/8"),o=i(n.a,a.a,null,null,null);t.a=o.exports},olkN:function(s,t,e){"use strict";var n=e("7+uW"),a=e("NYxO");n.a.use(a.b);var i={joined:!1,name:"",messages:[],rooms:["BCW","Shooting the breeze"],currentRoom:"",users:{},images:['<img src="//placehold.it/200x200">'],guests:0},o={setJoined:function(s,t){s.joined=t},addMessage:function(s,t){s.messages.push(t)},clearMessages:function(s){s.messages=[]},setCurrentRoom:function(s,t){s.currentRoom=t},leftRoom:function(s){s.currentRoom=""},setUsers:function(s,t){t&&(s.users=t)},addImage:function(s,t){s.messages.push({user:t.user,message:'<img src="'+t.message+'">'})},addLink:function(s,t){s.messages.push({user:t.user,message:'<a href="'+t.message+'" target="_blank">'+t.message+"</a>"})},setGuests:function(s,t){s.guests=t}},r={setJoined:function(s,t){var e=s.commit;s.dispatch;e("setJoined",t)},addMessage:function(s,t){var e=s.commit;s.dispatch;e("addMessage",t)},clearMessages:function(s){var t=s.commit;s.dispatch;t("clearMessages")},joinedRoom:function(s,t){var e=s.commit;s.dispatch;e("addMessage",{user:t.user?t.user:"Guest",message:"has joined the room"}),e("setUsers",t.users),e("setGuests",t.guests)},leftRoom:function(s,t){var e=s.commit;s.dispatch;e("leftRoom"),e("addMessage",{user:t,message:"Has left the room"})},addImage:function(s,t){var e=s.commit;s.state;e("addImage",t)},addLink:function(s,t){var e=s.commit;s.state;e("addLink",t)},setUsers:function(s,t){var e=s.commit;s.dispatch;e("setUsers",t.users),e("setGuests",t.guests)}},c={messages:function(s){return s.messages}};t.a=new a.b.Store({state:i,mutations:o,actions:r,getters:c,strict:!0})},xJD8:function(s,t,e){"use strict";var n=e("NYxO"),a=e("lZ5c");t.a={name:"app",components:{sidebar:a.a},data:function(){return{name:"",message:"",myHTML:""}},computed:e.i(n.a)({joined:function(s){return s.joined},messages:function(s){return s.messages},currentRoom:function(s){return s.currentRoom},images:function(s){return s.images}}),methods:{inputHandler:function(s){13!=s.keyCode&&10!=s.keyCode||!s.ctrlKey||this.send()},login:function(){this.name.trim()&&(this.$store.dispatch("setJoined",!0),this.$socket.emit("login",this.name.trim()))},leave:function(s){this.$store.dispatch("leftRoom",s||"Guest"),this.$socket.emit("leaveRoom"),this.clearMessages()},send:function(){this.message.trim()&&(this.$socket.emit("message",this.message.trim()),this.message="")},sendImg:function(){this.message&&(this.$socket.emit("image",this.message),this.message="")},sendLink:function(){this.message&&(this.$socket.emit("link",this.message),this.message="")},clearMessages:function(){this.$store.dispatch("clearMessages")}},sockets:{loggedIn:function(s){var t={user:s.user,message:"Shed their guest status."};this.$store.dispatch("addMessage",t),this.$store.dispatch("setUsers",{users:s.users,guests:s.guests})},left:function(s){var t={user:s.user?s.user:"Guest",message:"Has left the chat."};this.$store.dispatch("addMessage",t),this.$store.dispatch("setUsers",{users:s.users,guests:s.guests})},message:function(s){this.$store.dispatch("addMessage",s)},image:function(s){this.$store.dispatch("addImage",s)},link:function(s){this.$store.dispatch("addLink",s)}}}}},["NHnr"]);
//# sourceMappingURL=app.b4d127332ba20310c90c.js.map