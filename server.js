const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const UserManager = require('./UserManager')
const cors = require('cors');
const eventEmitter = require('./events/index')

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

const manager = new UserManager();

io.on('connection', (socket) => {
    console.log("New User conncted.....")
    let user = manager.addUser(socket);
    console.log(user.partner&&user.partner.id)

    socket.on('chat message', (msg) => {
        console.log(msg);
        user.sendMessage(msg);
    })

    socket.on('disconnect', () => {
        console.log("removing user " + socket.id)
        manager.removeUser(socket);
    })

})


server.listen(8000, () => {
    console.log('App is Listenning to port 8000....');
})