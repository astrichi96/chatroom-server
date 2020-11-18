const http = require('http');
const socketIo = require('socket.io');

const socketConnect = (app) => {
  const server = http.createServer(app);
  const io = socketIo(server);

  io.on('connection', function (socket) {
    console.log({ messages: 'Users Conected' });
  });
  return server;
};

module.exports = { socketConnect };
