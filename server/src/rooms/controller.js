const { rooms: roomsModel } = require('../../db/repository');

const saveRoom = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) throw Error('Name property is required');

    const room = await roomsModel.save({ name, description });
    return res.send(room);
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const { q } = req;
    const rooms = await roomsModel.findAll({ q });

    return res.send(rooms);
  } catch (error) {
    next(error);
  }
};

module.exports = { saveRoom, findAll };
