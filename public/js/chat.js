var socket = io();

function scrollToBottom(){
  //Selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHight = newMessage.innerHeight();
  var lastMessageHight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHight + lastMessageHight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function(){
  console.log('Diconected from server');
});

socket.on('newMessage', function(message) {

  var template = $('#message-template').html();
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  });
  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(location) {

  var template = $('#location-message-template').html();
  var formatedTime = moment(location.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    from: location.from,
    url: location.url,
    createdAt: formatedTime
  });
  $('#messages').append(html);
  scrollToBottom();
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageBox = $('[name=message]');
    console.log(messageBox.val());
  if(!messageBox.val()){
    return false;
  }
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