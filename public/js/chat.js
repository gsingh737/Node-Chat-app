var socket = io(); //creates connection request

function scrollToBottom() {
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight'); //this is basically the bar itself
  var scrollTop = messages.prop('scrollTop'); //this is the aread above the bar
  var scrollHeight = messages.prop('scrollHeight'); //this is the total height of the
  var newMessageHeight = newMessage.innerHeight();
  var lastMesageHeight = newMessage.prev().innerHeight();
  if(clientHeight + scrollTop + newMessageHeight + lastMesageHeight >= scrollHeight)
  {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('Connected to server');
  var param = jQuery.deparam(window.location.search);
  socket.emit('join', param, function(err){
      if(err){
        console.log(err);
        alert(err);
        window.location.href = '/';
      }else {
          console.log('No error');
      }
  });
});
socket.on('disconnect', function ()  {
  console.log('Disconnected from server');
});

socket.on('updateUsersList', function(users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user))
  });
  jQuery('#users').html(ol);
});


socket.on('newMessage', function(newMessage) {
  var formattedTime = moment(newMessage.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: newMessage.text,
    from: newMessage.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // var li = jQuery('<li> </li>');
  // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
  // jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from:'Test',
//   text: 'Hi'
// }, function(data){
//   console.log('Got it', data);
// });
socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();

  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My Current location</a>');
  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from:'User',
    text: messageTextBox.val()
  }, function(){
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location....');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('unable to fetch location');
  });
});
