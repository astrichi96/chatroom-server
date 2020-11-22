const db = require('../config');
const { generateToken } = require('../../../utils');

const Schema = db.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    username: this.username,
    access_token: generateToken({ username: this.username })
  };
};

const User = db.models.user || db.model('user', UserSchema);

module.exports = User;
