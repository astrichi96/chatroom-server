const MessageModel = require('../models/messages');

const save = ({ text, username, room }) =>
  MessageModel.create({ text, username });

const findAll = ({ room }) =>
  MessageModel.find({}).populate('user').sort({ createdAt: -1 }).limit(50);

module.exports = { save, findAll };
