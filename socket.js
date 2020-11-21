const http = require('http');
const socketIo = require('socket.io');
const { messages: messageModel } = require('./server/db/repository');
const services = require('./server/services/messageHandler');

const socketConnect = (app) => {
  const server = http.createServer(app);
  const io = socketIo(server);

  io.on('connection', function (socket) {
    console.log('New User conected');
    socket.on('join', function ({ room }) {
      socket.join(room);
    });

    socket.on('new-message', async (message) => {
      const messages = await services.handler(messageModel)(message);
      io.to(message.room).emit('messages', messages);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  return server;
};

module.exports = { socketConnect };
