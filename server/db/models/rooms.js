const db = require('../config');
const Schema = db.Schema;

const RoomSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Room = db.models.room || db.model('room ', RoomSchema);

module.exports = Room;
