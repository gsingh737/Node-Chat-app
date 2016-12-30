const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT|| 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
var app = express();

var server = http.createServer(app);
var io = socketio(server);
io.on('connection', (socket) => {
  console.log('New User connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));


socket.on('createMessage', (newMessage, callback) => {
  console.log('createMessage', newMessage);
  io.emit('newMessage', generateMessage(newMessage.from, newMessage.text)); // this is broadcasting to all clients
  // socket.broadcast.emit('newMessage', {from: newMessage.from, text: newMessage.text,  createdAt: new Date().getTime()});
  callback('This is from the server.');

});

socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude ))
});

socket.on('disconnect', () => {
  console.log('User disconnected');
});

}); //liten for events here connection event
app.use(express.static(publicPath));


server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
