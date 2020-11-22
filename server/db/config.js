const mongoose = require('mongoose');
const { mongoURI } = require('../../config');

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connect with mongo');
  });

module.exports = mongoose;
