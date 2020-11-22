const UserModel = require('../models/users');

const save = ({ username, password }) =>
  UserModel.create({ username, password });

const findOne = ({ username }) => UserModel.findOne({ username });

module.exports = { save, findOne };
