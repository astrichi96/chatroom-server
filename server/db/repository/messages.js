const MessageModel = require('../models/messages');

const save = ({ text, user, room }) =>
  MessageModel.create({ text, user, room });

const findAll = ({ room }) =>
  MessageModel.find({ room })
    .populate('user')
    .sort({ createdAt: -1 })
    .limit(50);

module.exports = { save, findAll };
