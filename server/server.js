const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const generateMessage = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000

var app = express();

app.use(express.static(publicPath))

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log("new user connected");

  // socket.emit('newMessage',{
  //   from: "ruchika",
  //   text : "hi ruchika",
  //   createdAt : "today"
  // })

  socket.emit('newMessage',generateMessage.messageGenerator('Admin',"Welcome to the chat"));

  socket.broadcast.emit('newMessage',generateMessage.messageGenerator('Admin',"New User Joined"));

  socket.on('createMessage',function(message){
    console.log(`new message arrives from ${message.from}`);
    console.log(`message is ${message.text}`);

    io.emit('newMessage',generateMessage.messageGenerator(message.from,message.text));

    // socket.broadcast.emit('newMessage',{
    //   from: message.from,
    //   text : message.text,
    //   createdAt : new Date().getTime()
    // })
  });

  socket.on('disconnect',()=>{
    console.log("user was disconnected");
  });
});


server.listen(port,()=>{
  console.log(`server is up and running on ${port}....`);
});
