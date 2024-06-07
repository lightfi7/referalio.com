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
    default: "",
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

UserSchema.pre("save", function (next) {
  const user = this;
  const password = user.password;
  user.salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, user.salt);
  next();
});

UserSchema.methods.checkPassword = function (givenPassword) {
  return bcrypt.compareSync(givenPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
