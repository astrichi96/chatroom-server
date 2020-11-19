const { messages: messagesModel } = require('../../db/repository');

const getAll = async (req, res) => {
  try {
    const messages = await messagesModel.findAll({});

    return res.send(messages);
  } catch (error) {
    console.log({ error });
    return res.status(500).send(error.message);
  }
};

module.exports = { getAll };
// Add validations and handle errors
