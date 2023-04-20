// create a WebSocket connection to the server
const socket = io();

// listen for messages from the server
socket.on("message", (data) => {
  console.log("Received message:", data);
});

// send a message to the server
socket.emit("message", "Hello, server!");
