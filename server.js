const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const UserManager = require('./UserManager')
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"]
    }
});

app.use(cors());

const manager = new UserManager();

io.on('connection', (socket) => {
    console.log(socket.handshake.query.username)
    console.log("New User connected.....")
    console.log(socket.id)
    let user = manager.addUser(socket);
    socket.on('chat message', (msg) => {
        console.log(msg);

        console.log(user)
        user.sendMessage(msg);
    })

    // socket.on('')

    socket.on('disconnect', () => {
        console.log("removing user " + socket.id)
        manager.removeUser(user);
    })

})


server.listen(8000, () => {
    console.log('App is Listenning to port 8000....');
})