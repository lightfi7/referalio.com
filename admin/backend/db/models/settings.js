const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  email: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
});

const Settings = mongoose.model("settings", SettingsSchema);

module.exports = Settings;
