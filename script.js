const socket = io('http://127.0.0.1:3000')

const messageContainer=document.getElementById('message-container')
const messageForm=document.getElementById('send-container')
const messageInput=document.getElementById('message-input')
const status = document.getElementById('status')
 const name = document.getElementById('take-name');

// const name = prompt('whats is your name?')
name.addEventListener('submit',(e)=>{
    e.preventDefault()
    const newName = document.getElementById('name').value;
    appendMessage('You joined','connected')
    socket.emit('new-user',newName)
    document.getElementById('display').style.display = 'none';
    messageContainer.style.opacity = "1";
    messageForm.style.opacity = '1';
    document.getElementById('bg').remove()
})




socket.on('chat-message', data =>{
    // console.log(data)
    status.innerHTML ='';
    appendMessage(`${data.name}: ${data.message}`,'theirMessage')
})

socket.on('user-connected', name =>{
    // console.log(data)
    appendMessage(`${name} connected`, 'connected')
})

socket.on('user-disconnected', name =>{
    // console.log(data)
    appendMessage(`${name} disconnected`,'disconnected')
})

messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`,'myMessage')
    socket.emit('send-chat-message',message)
    messageInput.value=''
})

function appendMessage(message, userStatus){
    
    const messageElement = document.createElement('div')
    const spanMessage = document.createElement('div');
    spanMessage.innerText=message
    if(userStatus == 'connected'){
        messageElement.id += 'connected';
        messageElement.append(spanMessage)
        messageContainer.append(messageElement)
    }else if(userStatus == 'disconnected'){
        messageElement.id += 'disconnected';
        messageElement.append(spanMessage)
        messageContainer.append(messageElement)
    }else if(userStatus == 'myMessage'){
        messageElement.className += 'myMessage';
        messageElement.append(spanMessage)
        messageContainer.append(messageElement)
    }else if(userStatus == 'theirMessage'){
        messageElement.className += 'theirMessage';
        messageElement.append(spanMessage)
        messageContainer.append(messageElement)
    }else{
        messageElement.append(spanMessage)
        messageContainer.append(messageElement)
    }
    
}
  
  messageInput.addEventListener('keypress',function(){
    socket.emit('typing', name);
   })

   socket.on('typing',function(data){
       status.innerHTML = `${data} is typing...`;
   })

  