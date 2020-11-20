const http = require('http');
const socketIo = require('socket.io');
const { messages: messageModel } = require('./server/db/repository');

const socketConnect = (app) => {
  const server = http.createServer(app);
  const io = socketIo(server);

  io.on('connection', function (socket) {
    console.log('users conected');
    socket.on('subscribe', function (room) {
      socket.join(room);
    });

    socket.on('new-message', async (message) => {
      await messageModel.save(message);
      const messages = await messageModel.findAll({ room: message.room });
      io.in('5fb730acf95d2741ef11ebd8').emit(messages.reverse());
    });

    socket.on('disconnect', () => {
      console.log('se desconecto');
    });
  });
  return server;
};

module.exports = { socketConnect };
