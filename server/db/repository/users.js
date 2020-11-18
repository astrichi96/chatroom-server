const UserModel = require('../models/users');

const save = ({ username, fullname }) =>
  UserModel.create({ username, fullname });

module.exports = { save };
