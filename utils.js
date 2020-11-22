const csvjson = require('csvjson');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { saltRounds, jwtSecret } = require('./config');

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
  bcrypt.hashSync(password, bcrypt.genSaltSync(+saltRounds));

const validatePassWord = ({ passwordHash, password }) =>
  bcrypt.compareSync(password, passwordHash);

const generateToken = (claims) =>
  jwt.sign(claims, jwtSecret, { expiresIn: '1d' });

const verifyToken = (token) => jwt.verify(token, jwtSecret);

module.exports = {
  BOT_CODE,
  BOT_USER,
  BOT_MESSAGES,
  createJson,
  encryptPassword,
  validatePassWord,
  generateToken,
  verifyToken
};
