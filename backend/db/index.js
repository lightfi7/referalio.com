const mongoose = require("mongoose");
const config = require("../config/default");

exports.connect = (app) => {
  mongoose
    .connect(config.mongodb_uri, {
      authSource: "admin",
      user: "referalioAdmin",
      pass: "referalio",
    })
    .then(() => {
      console.log("MongoDB is connected");
      app.emit("ready");
    })
    .catch((err) => {
      console.log(err);
    });
};
