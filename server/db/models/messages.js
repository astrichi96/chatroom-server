const db = require('../config');
const Schema = db.Schema;

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    required: true
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'room',
    index: true,
    required: true
  },
  text: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = db.models.message || db.model('message', MessageSchema);

module.exports = Message;
