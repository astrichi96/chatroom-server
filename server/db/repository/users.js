const UserModel = require('../models/users');

const save = ({ username }) => UserModel.create({ username });

module.exports = { save };
