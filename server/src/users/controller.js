const { users: usersModel } = require('../../db/repository');

const saveUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username) throw Error('username property is required');

    const user = await usersModel.save({ username });
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { saveUser };
