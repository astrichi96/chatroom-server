const { users: usersModel } = require('../../db/repository');

const saveUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await usersModel.save({ username });

    return res.send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { saveUser };
// Add validations and handle errors
