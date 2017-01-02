const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT|| 3000;
const {isRealString} = require("./utils/validation");
const {Users} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/message');
var app = express();

var server = http.createServer(app);
var io = socketio(server);
var users = new Users();

io.on('connection', (socket) => {
  console.log('New User connected');

  socket.on('join', (params, callback) => {
      if(!isRealString(params.name) || !isRealString(params.room)){
        return callback('Name and Room name are required');
      }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      //socket.leave('The office fans');
      //io.emit -> io.to('The office fans').emit
      //socket.broadcast.emit -> socket.broadcast.to('The office fans').emit
      //socket.emit
      io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has Joined`));
      callback();
  });


socket.on('createMessage', (newMessage, callback) => {
  var user = users.getUser(socket.id);
  if(user && isRealString(newMessage.text)){
    io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text)); // this is broadcasting to all clients
  }
  // socket.broadcast.emit('newMessage', {from: newMessage.from, text: newMessage.text,  createdAt: new Date().getTime()});
  callback();

});

socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude ))
    }
});

socket.on('disconnect', () => {
  var user = users.removeUser(socket.id);
  if(user){
    io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
  }
  console.log('User disconnected');
});


}); //liten for events here connection event
app.use(express.static(publicPath));


server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
