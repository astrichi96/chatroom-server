const MessageModel = require('../models/messages');

const save = ({ text, user, room }) => MessageModel.create({ text, user });

const findAll = ({ room }) =>
  MessageModel.find({}).populate('user').sort({ createdAt: -1 }).limit(50);

module.exports = { save, findAll };
