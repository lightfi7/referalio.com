const express = require("express");
const AuthController = require("../controllers/auth.controller");
const ProgramController = require("../controllers/program.controller");
const MembershipController = require("../controllers/membership.controller");

const routes = (app) => {
  const router = express.Router();

  router.post("/auth/signin", AuthController.signin);
  router.post("/auth/signup", AuthController.signup);
  router.post("/auth/setOffline", AuthController.setOffline);
  router.post("/getInfo", ProgramController.getInfo);
  router.post("/getData", ProgramController.getData);
  router.post("/getSearchData", ProgramController.getSearchData);
  router.post("/getMemberShipInfo", MembershipController.getMemberShipInfo);
  router.post("/updatePremiumStatus", MembershipController.updatePremiumStatus);

  app.use("/api", router);
};

module.exports = routes;
