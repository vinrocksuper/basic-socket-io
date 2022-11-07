const http = require('http');
const { Server } = require('socket.io');
let io;

const handleChatMessage = (message) => {
    // console.log(message);
    io.emit(message.channel, message.message);
}

const socketSetup = (app) => {
    const server = http.createServer(app);
    io = new Server(server);

    // whenever a client connects to the server
    // io connects to everybody on the server
    io.on('connection', (socket) => {
        console.log('a user connected');

        // this targets specifically a user
        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });

        socket.on('chat message', handleChatMessage)
    });



    return server;
}

module.exports = socketSetup;