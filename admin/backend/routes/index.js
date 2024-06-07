const express = require("express");

const AuthController = require("../controllers/auth.controller");
const UserController = require("../controllers/user.controller");
const ProgramController = require("../controllers/program.controller");
const MembershipController = require("../controllers/membership.controller");
const SettingsController = require("../controllers/setting.contoller");
const DashboardController = require("../controllers/dashboard.controller");

const routes = (app) => {
  const router = express.Router();
  router.post("/api/auth/doLogin", AuthController.doLogin);
  router.post("/api/addUser", UserController.addUser);
  router.post("/api/deleteUser", UserController.deleteUser);
  router.post("/api/getUser", UserController.getUser);
  router.post("/api/updateUserData", UserController.updateUserData);
  router.post("/api/blockUser", UserController.blockUser);
  router.post("/api/getList", ProgramController.getList);
  router.post("/api/getPromotedList", ProgramController.getPromotedList);
  router.post("/api/doSchedule", ProgramController.doSchedule);
  router.post("/api/setFreeNumber", MembershipController.setFreeNumber);
  router.post("/api/setPrice", MembershipController.setPrice);
  router.post("/api/setScretkey", SettingsController.setSecretKey);
  router.post("/api/changePassword", SettingsController.changePassword);
  router.post("/api/setScrapeSetting", SettingsController.setScrapeSetting);
  router.post("/api/getDashBoardInfo", DashboardController.getDashBoardInfo);
  router.post("/api/getMemberShipPlan", MembershipController.getMemberShipPlan);

  app.use("/admin", router);
};

module.exports = routes;
