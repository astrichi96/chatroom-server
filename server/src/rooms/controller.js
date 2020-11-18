const { rooms: roomsModel } = require('../../db/repository');

const saveRoom = async (req, res) => {
  try {
    const { name, description } = req.body;
    const room = await roomsModel.save({ name, description });

    return res.send(room);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findAll = async (req, res) => {
  try {
    const { q } = req;
    const rooms = await roomsModel.findAll();

    return res.send(rooms);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { saveRoom, findAll };
// Add validations and handle errors and add search filters
