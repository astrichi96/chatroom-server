const http = require('http');
const socketIo = require('socket.io');
const { messages: messageModel } = require('./server/db/repository');

const socketConnect = (app) => {
  const server = http.createServer(app);
  const io = socketIo(server);

  io.on('connection', async function (socket) {
    const messages = await messageModel.findAll({});

    console.log('users conected');
    socket.emit('messages', messages);

    socket.on('new-message', async (message) => {
      await messageModel.save(message);
      const messages = await messageModel.findAll({});
      socket.emit('messages', messages);
    });
  });
  return server;
};

module.exports = { socketConnect };
