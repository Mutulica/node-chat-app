var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function(){
  console.log('Diconected from server');
});

socket.on('newMessage', function(message) {
  console.log('New message: ', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(location) {
  var li = $('<li></li>');
  var link = $('<a target="_blank">My Location </a>');
  li.text(`${location.from}:`);
  link.attr('href', location.url);
  li.append(link);
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'Sebas2',
    text: $('[name=message]').val()
  }, function (data) {
    $('[name=message]').val('');
  });
});


var locationButton = $('#send-location');

$('#send-location').on('click', function(){
  // if(!navigator.gelocation){
  //   return alert('Geolocation not supported by your browser.');
  // }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function(){
    alert('Unable to fetch location.')
  });
});
