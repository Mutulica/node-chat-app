var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function(){
  console.log('Diconected from server');
});

socket.on('newMessage', function(message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${message.from} ${formatedTime}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(location) {
  var formatedTime = moment(location.createdAt).format('h:mm a');
  var li = $('<li></li>');
  var link = $('<a target="_blank">My Location </a>');
  li.text(`${location.from} ${formatedTime}: `);
  link.attr('href', location.url);
  li.append(link);
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageBox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'Sebas2',
    text: messageBox.val()
  }, function () {
    messageBox.val('');
  });
});


var locationButton = $('#send-location');

locationButton.on('click', function(){
  // if(!navigator.gelocation){
  //   return alert('Geolocation not supported by your browser.');
  // }
  locationButton.attr('disabled', true).text('Searching');;
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    locationButton.removeAttr('disabled').text('Location');
    alert('Unable to fetch location.')
  });
});
