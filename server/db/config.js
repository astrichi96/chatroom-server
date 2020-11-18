const mongoose = require('mongoose');
const { MONGO_URI = 'mongodb://localhost:27017/messages' } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connect with mongo');
  });

module.exports = mongoose;