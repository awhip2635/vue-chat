var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/../client'));

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

var rooms = {
	"BCW": {
		users: {},
		guests: 0

	},
	"Shooting the breeze": {
		users: {},
		guests: 0
	},
	"Chat Room 3": {
		users: {},
		guests: 0
	}
}

io.on('connection', function (socket) {

	socket.on('joinRoom', function (room) {
		if (room) {
			// console.log(socket.user)
			socket.join(room, function () {
				// console.log(socket.user)
			});
			socket.room = room;
			io.to(room).emit('joinedRoom', { room: room });
		}
	});
	socket.on('join', function (user) {
		if (user) {
			var users = rooms[socket.room].users
			if (users[user]) {

				var num = 1
				var newUser = user + num
				while (users[newUser]) {
					num++
					var newUser = user + num
				}
				users[newUser] = newUser
				user = newUser
			} else {
				users[user] = user
			}
			socket.user = user
			console.log(user)
			io.to(socket.room).emit('joinedRoom', { room: socket.room, user: user, users: users })
		}
	})

	socket.on('leaveRoom', () => {
		io.to(socket.room).emit('left', socket.user ? socket.user : 'Guest');
		socket.room = '';
	})

	socket.on('disconnect', reason => {
		io.to(socket.room).emit('left', socket.user);
		socket.user = '';
	})

	socket.on('leave', function () {
		io.to('BCW'.emit('left', socket.user))
	})

	socket.on('message', function (text) {
		if (text) {
			io.to(socket.room).emit('message', { user: socket.user, message: text });

		}
	});

	socket.on('image', function (img) {
		if (img) {
			io.to('BCW').emit('image', { user: socket.user, message: img });
		}
	});

	socket.on('link', function (url) {
		if (url) {
			io.to('BCW').emit('link', { user: socket.user, message: url });
		}
	});

	socket.on('disconnect', (reason) => {
		io.to('BCW').emit('left', socket.user)
	})

});