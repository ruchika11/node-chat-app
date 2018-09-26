var socket = io();
socket.on('connect',function(){
  console.log('connected to server');
  socket.emit('createMessage',{
    from: "arpita",
    text: "hello arpita"
  });

});

socket.on('disconnect',function(){
  console.log("disconnected from server");
});

socket.on('newMessage',function(message){
  console.log(`hey ${message.from} you got new message`);
  console.log(`message is ${message.text}`);
  console.log(`time: ${message.createdAt}`)
});
