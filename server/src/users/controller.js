const { users: usersModel } = require('../../db/repository');

const saveUser = async (req, res) => {
  try {
    const { username, fullname } = req.body;
    const user = await usersModel.save({ username, fullname });

    return res.send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { saveUser };
// Add validations and handle errors
