const csvjson = require('csvjson');

const createJson = (stream) =>
  csvjson.toObject(stream, { delimiter: ',', quote: '"' });

const BOT_CODE = 'stock';

const BOT_USER = {
  username: 'chatbot',
  code: 'BOT'
};

const BOT_MESSAGES = {
  CODE_INVALID: 'Stock Code is invalid',
  VALUE_INVALID: 'Invalid quote or stock not found',
  SERVICE_FAILED: 'Something is wrong with the service'
};

module.exports = { BOT_CODE, BOT_USER, BOT_MESSAGES, createJson };
