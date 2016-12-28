const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT|| 3000;

var app = express();

var server = http.createServer(app);
var io = socketio(server);
io.on('connection', (socket) => {
  console.log('New User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
}); //liten for events here connection event
app.use(express.static(publicPath));


server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
