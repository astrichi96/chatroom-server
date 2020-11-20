const RoomModel = require('../models/rooms');

const save = ({ name, description }) => RoomModel.create({ name, description });

const findAll = ({ q }) => {
  let query = {};
  if (q) query['name'] = { $regex: new RegExp(q, 'i') };
  return RoomModel.find(query).sort({ name: 'asc' });
};

module.exports = { save, findAll };
