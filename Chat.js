const body = document.querySelector("#body");
const text = document.querySelector('textarea')
const send = document.querySelector('button')


const socket = io();

socket.on('chat message', (msg) => {
    console.log(msg);

    let message = document.createElement('div');

    message.innerText = msg;
    body.append(message);
    message.style.float = "left";
    message.style.clear = "both";
    message.style.padding = "8px";
    message.style.margin = "7px";
    message.style.backgroundColor = "lightyellow";


})
send.addEventListener('click', (e) => {
    socket.emit('chat message', text.value);
    
    let message = document.createElement('div');

    message.innerText = text.value;
    body.append(message);
    message.style.float = "right";
    message.style.clear = "both";
    message.style.padding = "8px";
    message.style.margin = "7px";
    message.style.backgroundColor = "lightgreen";
    message.style.fontSize = "1.1rem";
    message.style.fontFamily = "monospace";
    
    text.value = "";
})