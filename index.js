const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());

let messages = [];
io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('chat message', (msg) => {
        console.log('message:', msg);
        messages.push(msg);
        io.emit('chat message', msg); // broadcast to all
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });
});

app.get('/messages', (req, res) => {
    res.send(messages);
});

server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
