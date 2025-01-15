const socket = io("https://backend-chat-production-9f87.up.railway.app");

// Send message on form submit
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const usernameForm = document.getElementById('usernameForm');
const usernameInput = document.getElementById('usernameInput');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

usernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('setUsername', usernameInput.value);
    usernameInput.value = '';
});

// Receive message from server and display
socket.on('initMessages', (msgs) => {
    msgs.forEach((msg) => {
        const item = document.createElement('li');
        item.textContent = `${msg.user} at ${msg.time}: ${msg.text}`;
        messages.appendChild(item);
    });
});

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = `${msg.user} at ${msg.time}: ${msg.text}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});