const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  salt: {
    type: String,
  },
  hasPremium: {
    type: Boolean,
    default: false,
  },
  isOnline: {
    type: Boolean,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Number,
    default: 0,
  },
  startson: {
    type: Date,
    default: Date.now(),
  },
  endson: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.methods.checkPassword = function (givenPassword) {
  const user = this;
  return bcrypt.compareSync(givenPassword, user.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
