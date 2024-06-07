const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlatformSchema = new Schema({
  id: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
});

const Platforms = mongoose.model("Platforms", PlatformSchema);

module.exports = Platforms;
