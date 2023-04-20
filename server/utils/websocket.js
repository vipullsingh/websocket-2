const { Server } = require('socket.io');
const Vote = require('../models/vote');

const initWebsocket = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('User connected');

    // listen for vote events
    socket.on('vote', async (candidateId) => {
      try {
        // save the vote to the database
        const vote = new Vote({ candidate: candidateId, ipAddress: socket.handshake.address });
        await vote.save();

        // broadcast the vote to all clients
        io.emit('vote', candidateId);
      } catch (err) {
        console.error(err);
      }
    });

    // listen for disconnect events
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = initWebsocket;
