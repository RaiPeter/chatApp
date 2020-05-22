const io = require('socket.io')(3000)
const users = {}

io.on('connection', socket =>{
    // console.log('new useer');

    var socketId = socket.id;
    var clientIp = socket.request.connection.remoteAddress;
  
    console.log(socketId);
    console.log(clientIp);

    socket.on('new-user', name =>{
        users[socket.id]=name
        socket.broadcast.emit('user-connected',name)
    })

    
    socket.emit('chat-messagae','Hello World')

    socket.on('send-chat-message',message =>{
        console.log(message)
        socket.broadcast.emit('chat-message', {message: message,
            name:users[socket.id]})

    })
    socket.on('disconnect',() =>{
        // console.log(message)
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
    })


    socket.on('typing', function(data){
       socket.broadcast.emit('typing', data);
    });
})