const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require("https");
const routes = require("./routes");
const db = require("./db");
const config = require("./config");
const Memberships = require("./db/models/membership");
const MembershipPlan = require("./db/models/membershipPlan");
const User = require("./db/models/user");
const SecretKeys = require("./db/models/secretKey");

const app = express();

db.connect(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

routes(app);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const init = async () => {
  User.findOne({ email: config.email }).then((result) => {
    if (!result) {
      const admin = new User({
        name: config.name,
        email: config.email,
        password: config.password,
        hasPremium: true,
        isOnline: true,
        isAdmin: true,
        status: 0,
      });
      admin.save();
    }
  });

  Memberships.findOne({ freeNumber: config.freeNumber }).then((result) => {
    if (!result) {
      const membership = new Memberships({
        freeNumber: config.freeNumber,
        price: config.price,
      });

      membership.save();
    }
  });

  SecretKeys.findOne().then((result) => {
    if (result == null) {
      const newSecretKey = new SecretKeys({ secretKey: config.secretKey });
      newSecretKey.save();
    }
  });

  MembershipPlan.findOne().then((result) => {
    if (!result) {
      config.initPlan.map((item, index) => {
        console.log(item);
        const saveData = new MembershipPlan(item);
        saveData.save();
      });
    }
  });
};

app.listen(8003, async () => {
  init();
  console.info("Server is up on port", 8003);
});

module.exports = app;
