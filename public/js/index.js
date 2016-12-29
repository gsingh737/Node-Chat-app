var socket = io(); //creates connection request
socket.on('connect', function () {
  console.log('Connected to server');
});
socket.on('disconnect', function ()  {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(newMessage) {
  console.log('New Message', newMessage);
});
