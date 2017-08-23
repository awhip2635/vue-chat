var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/../client'));

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

io.on('connection', function (socket) {

	socket.join('BCW', function () {

	});

	socket.on('join', function (name) {
		if (name) {
			socket.user = name;
			io.to('BCW').emit('user', name);
		}
	});

	socket.on('leave', function () {
		io.to('BCW'.emit('left', socket.user))
	})

	socket.on('message', function (text) {
		if (text) {
			io.to('BCW').emit('message', { user: socket.user, message: text });
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