const express = require('express');
const app = express();
const { socketConnect } = require('./socket');
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRoutes = require('./server/src/users');
const messagesRoutes = require('./server/src/messages');

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Service running' });
});
app.use('/users', usersRoutes);
app.use('/messages', messagesRoutes);

const socketServer = socketConnect(app);

socketServer.listen(port, async () => {
  console.log(`Listening on port ${port}`);
});
