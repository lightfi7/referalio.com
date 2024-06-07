const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SecretKeySchema = new Schema({
  secretKey: {
    type: String,
    default: "",
  },
});

const SecretKeys = mongoose.model("secretKeys", SecretKeySchema);

module.exports = SecretKeys;
