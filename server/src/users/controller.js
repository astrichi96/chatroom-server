const { users: usersModel } = require('../../db/repository');
const utils = require('../../../utils');

const saveUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username) throw Error('username property is required');
    if (!password) throw Error('password property is required');

    const passwordHash = utils.encryptPassword(password);
    const user = await usersModel.save({ username, password: passwordHash });
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username) throw Error('username property is required');
    if (!password) throw Error('password property is required');

    const user = await usersModel.findOne({ username });

    if (!utils.validatePassWord({ passwordHash: user.password, password }))
      return res.status(401).send({ message: 'User invalid' });

    return res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { saveUser, loginUser };
