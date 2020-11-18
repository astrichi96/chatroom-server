const db = require('../config');
const Schema = db.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  fullname: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = db.models.user || db.model('user', UserSchema);

module.exports = User;
