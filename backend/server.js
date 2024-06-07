const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index");
const db = require("./db");
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

app.listen(5000, async () => {
  console.log("Server is up on port", 5000);
});

module.exports = app;
