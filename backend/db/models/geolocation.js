const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GeolocationSchema = new Schema({
  id: {
    type: Number,
    default: 0,
  },
  country_code: {
    type: String,
    default: "",
  },
});

const Geolocations = mongoose.model("Geolocations", GeolocationSchema);

module.exports = Geolocations;
