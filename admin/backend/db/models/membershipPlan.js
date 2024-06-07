const mongoose = require("mongoose");
const { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } = require("puppeteer");

const Schema = mongoose.Schema;

const MembershipPlanSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    default: 0,
  },
  period: {
    type: String,
    default: "",
  },
  programs: {
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

const MembershipPlan = mongoose.model("MembershipPlan", MembershipPlanSchema);

module.exports = MembershipPlan;
