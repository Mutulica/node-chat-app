var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessage', {
    to: 'Someone@someone.com',
    text: 'Hey this is someone'
  });
  
});

socket.on('disconnect', function(){
  console.log('Diconected from server');
});

socket.on('newMessage', function(message) {
  console.log('New message: ', message);
});
