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
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err){
    if(err) {
      alert(err);
      window.location.href = '/';
    }else{
      console.log('No Error');
    }
  });
});

socket.on('updateUserList', function(users) {
  $('#users').html('');
  var ol = $('<ol></ol>');
  users.forEach(function(user){
    ol.append($('<li></li>').text(user));
  });
  $('#users').append(ol);
  console.log('Users List:' ,users);
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
