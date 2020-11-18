const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { socketConnect } = require('./socket');
const port = process.env.PORT || 4000;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({ message: 'all good' });
});

const socketServer = socketConnect(app);

socketServer.listen(port, async () => {
  console.log(`Listening on port ${port}`);
});
