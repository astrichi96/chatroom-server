const db = require('../config');
const Schema = db.Schema;

const MessageSchema = new Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = db.models.message || db.model('message', MessageSchema);

module.exports = Message;
