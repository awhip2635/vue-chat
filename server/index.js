var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

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

function checkForDuplicateUser(user, room) {
    var users = rooms[room].users
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

    return user;
}

io.on('connection', function (socket) {
    socket.on('joinRoom', function (room) {
        if (room) {
            socket.join(room, function () {
            });
            // if (socket.room)
            //     delete rooms[socket.room].users[socket.user]
            // io.to(socket.room).emit('left', socket.user);
            socket.room = room;
            if (socket.user)
                socket.user = checkForDuplicateUser(socket.user, socket.room)
            else
                rooms[socket.room].guests++;
            io.to(room).emit('joinedRoom', { room: room, user: socket.user, users: rooms[socket.room].users, guests: rooms[socket.room].guests });
        }
    });

    socket.on('login', function (user) {
        if (user) {
            rooms[socket.room].guests--;
            socket.user = checkForDuplicateUser(user, socket.room)
            io.to(socket.room).emit('loggedIn', { user: socket.user, users: rooms[socket.room].users, guests: rooms[socket.room].guests });
        }
    })

    socket.on('leaveRoom', () => {
        if (socket.room) {
            if (socket.user)
                delete rooms[socket.room].users[socket.user]
            else
                rooms[socket.room].guests--;
            io.to(socket.room).emit('left', { user: socket.user, users: rooms[socket.room].users, guests: rooms[socket.room].guests });
            socket.room = '';
        }
    })

    // When this is called, socket.room and socket.user have already been blown away
    socket.on('disconnect', reason => {
        if (socket.room) {
            if (socket.user)
                delete rooms[socket.room].users[socket.user]
            else
                rooms[socket.room].guests--;
            io.to(socket.room).emit('left', { user: socket.user, users: rooms[socket.room].users, guests: rooms[socket.room].guests });
            socket.user = '';
        }
    })

    socket.on('message', function (text) {
        if (text) {
            io.to(socket.room).emit('message', { user: socket.user, message: text });
        }
    });

    socket.on('image', function (img) {
        if (img) {
            io.to(socket.room).emit('image', { user: socket.user, message: img });
        }
    });

    socket.on('link', function (url) {
        if (url) {
            io.to(socket.room).emit('link', { user: socket.user, message: url });
        }
    });
});