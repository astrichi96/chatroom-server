const RoomModel = require('../models/rooms');

const save = ({ name, description }) => RoomModel.create({ name, description });
const findAll = () => RoomModel.find().sort({ name: 'asc' });

module.exports = { save, findAll };
