const socket = io('http://localhost:3000')


const messageContainer=document.getElementById('message-container')
const messageForm=document.getElementById('send-container')
const messageInput=document.getElementById('message-input')

const name = prompt('whats is your name?')
appendMessage('You joned')
socket.emit('new-user',name)

socket.on('chat-message', data =>{
    // console.log(data)
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name =>{
    // console.log(data)
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name =>{
    // console.log(data)
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value=''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText=message
    messageContainer.append(messageElement)
}