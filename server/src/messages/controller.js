const { messages: messagesModel } = require('../../db/repository');

const getAll = async (req, res, next) => {
  try {
    const { room } = req.query;
    const messages = await messagesModel.findAll({ room });
    return res.send(messages.reverse());
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll };
