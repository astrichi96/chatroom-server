const express = require('express');
const app = express();
const { socketConnect } = require('./socket');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRoutes = require('./server/src/users');
const messagesRoutes = require('./server/src/messages');
const roomsRoutes = require('./server/src/rooms');

const errorHandler = require('./server/middlewares/errorHandler');

const port = process.env.PORT || 4000;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());

app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/messages', messagesRoutes);
app.use('/rooms', roomsRoutes);

app.use(errorHandler);
const socketServer = socketConnect(app);

socketServer.listen(port, async () => {
  console.log(`Listening on port ${port}`);
});

module.exports = socketServer;
