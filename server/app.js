var express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

var PORT = process.env.PORT || '3002';

var router = require('./routes/index');

var app = express();
var server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('We have a new connection');
    socket.on('disconnect', () => {
        console.log('User had left');
    });
});

app.use('/', router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

module.exports = app;
