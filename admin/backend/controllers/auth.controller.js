const User = require("../db/models/user");
const { StatusCodes } = require("http-status-codes");
const config = require("../config");
const jwt = require("jwt-simple");

const getTimeout = () => {
  const defaultTimeout = 60 * 60; // 1 hour
  const tokenTimeout = config.tokenTimeout;

  if (isNaN(tokenTimeout) || !tokenTimeout || tokenTimeout === 0) {
    return defaultTimeout;
  }
  return tokenTimeout;
};

const tokenForUser = (user) => {
  if (user) {
    const secret = config.appSecret;
    const timestamp = Math.floor(Date.now() / 1000); // in seconds
    const exp = timestamp + getTimeout(); // Note: timed out requests return a 401
    const hasPremium = user.hasPremium;
    return jwt.encode(
      { sub: user.email, iat: timestamp, exp, hasPremium: hasPremium },
      secret
    );
  }
};

const doLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isAdmin == 1) {
        if (existingUser.checkPassword(password)) {
          const token = tokenForUser(existingUser);
          res.status(StatusCodes.OK).json({
            title: "Authentication Success",
            message: existingUser.name + "is Logi ned successfully!",
            accessAdminToken: token,
            name: existingUser.name,
          });
        } else {
          res.status(StatusCodes.BAD_REQUEST).json({
            title: "Authentication Error",
            message: "Password is incorrect!",
          });
        }
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          title: "Authentication Error",
          message: "Access denied!",
        });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        title: "Authentication Error",
        message: "That email is not exist!",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  doLogin,
};
