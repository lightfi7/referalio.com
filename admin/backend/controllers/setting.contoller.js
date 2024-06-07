const SecretKeys = require("../db/models/secretKey");
const Settings = require("../db/models/settings");
const Users = require("../db/models/user");
const { StatusCodes } = require("http-status-codes");

const setSecretKey = async (req, res, next) => {
  try {
    const { secretVal } = req.body.data;
    await SecretKeys.findOneAndUpdate({}, { secretKey: secretVal });
    res.status(StatusCodes.OK).json({
      message: "Save successfully!",
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const setScrapeSetting = async (req, res, next) => {
  const { email, password } = req.body.data;
  const saveData = new Settings({
    email,
    password,
  });
  await saveData.save();
  res.status(StatusCodes.OK).json({
    message: "Update successfully!",
  });
};

const changePassword = (req, res, next) => {
  try {
    const { email, currentPwd, newPwd } = req.body.data;
    Users.findOne({ email }).then((existingUser) => {
      if (existingUser.checkPassword(currentPwd)) {
        existingUser.password = newPwd;
        existingUser.save().then(() => {
          res.status(StatusCodes.OK).json({
            message: "Update password successfully!",
          });
        });
      } else {
        res.status(StatusCodes.BAD_GATEWAY).json({
          message: "Previous password is incorrect!",
        });
      }
    });
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({
      message: error,
    });
    next(error);
  }
};

module.exports = {
  setSecretKey,
  changePassword,
  setScrapeSetting,
};
