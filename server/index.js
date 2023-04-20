const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");

// initialize the app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// set up middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// initialize the candidate list and vote counts
let candidates = [
  { name: "Candidate 1", votes: 0 },
  { name: "Candidate 2", votes: 0 },
  { name: "Candidate 3", votes: 0 },
];

// listen for WebSocket connections
io.on("connection", (socket) => {
  console.log("New client connected");

  // send the initial candidate list and vote counts to the client
  socket.emit("candidates", candidates);

  // listen for vote events from the client
  socket.on("vote", (candidateName) => {
    // find the candidate object with the matching name and increment the vote count
    const candidate = candidates.find((c) => c.name === candidateName);
    candidate.votes++;

    // emit the updated candidate list and vote counts to all clients
    io.emit("candidates", candidates);
  });

  // listen for disconnection events
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// start the server
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
