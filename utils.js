const csvjson = require('csvjson');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = process.env;

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

const encryptPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(+SALT_ROUNDS));

const validatePassWord = ({ passwordHash, password }) =>
  bcrypt.compareSync(password, passwordHash);

module.exports = {
  BOT_CODE,
  BOT_USER,
  BOT_MESSAGES,
  createJson,
  encryptPassword,
  validatePassWord
};
