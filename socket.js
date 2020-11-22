const http = require('http');
const socketIo = require('socket.io');
const { messages: messageModel } = require('./server/db/repository');
const { verifyToken } = require('./utils');
const services = require('./server/services/messageHandler');

const socketConnect = (app) => {
  const server = http.createServer(app);
  const io = socketIo(server);

  io.on('connection', function (socket) {
    console.log('New User conected');
    socket.on('join', function ({ room, token }) {
      try {
        verifyToken(token);
        socket.join(room);
      } catch (err) {
        console.log('User invalid');
      }
    });

    socket.on('new-message', async (message) => {
      try {
        verifyToken(message.token);
        const messages = await services.handler(messageModel)(message);
        io.to(message.room).emit('messages', messages);
      } catch (err) {
        console.log('User invalid');
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  return server;
};

module.exports = { socketConnect };
