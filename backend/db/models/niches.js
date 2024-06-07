const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NicheSchema = new Schema({
  id: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
});

const Niches = mongoose.model("Niches", NicheSchema);

module.exports = Niches;
