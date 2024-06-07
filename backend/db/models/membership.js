const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MembershipsSchema = new Schema({
  freeNumber: {
    type: Number,
    default: 50,
  },
  price: {
    type: Number,
    default: 99,
  },
});

const Memberships = mongoose.model("Memberships", MembershipsSchema);

module.exports = Memberships;
