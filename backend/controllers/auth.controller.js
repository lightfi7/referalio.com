const User = require("../db/models/user");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jwt-simple");
const config = require("../config/default");
const bcrypt = require("bcryptjs");

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
    const premiumExpired = isExpired(user.endson);
    return jwt.encode(
      {
        sub: user.email,
        iat: timestamp,
        exp,
        hasPremium: hasPremium,
        premiumExpired: premiumExpired,
      },
      secret
    );
  }
};

const isExpired = (endString) => {
  const currentDate = new Date();
  const finishDate = new Date(endString);
  const totalDurationMs = finishDate - currentDate;
  const totalDurationDays = totalDurationMs / (1000 * 60 * 60 * 24);
  if (Math.ceil(totalDurationDays) <= 0) {
    return false;
  } else {
    return true;
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body.data;
    const user = await User.findOne({ email });
    if (user) {
      if (user.status != 1) {
        if (user.checkPassword(password)) {
          user.isOnline = true;
          user.save();
          const token = tokenForUser(user);
          res.status(StatusCodes.OK).json({
            title: "Authentication Success",
            message: user.name + "is Logined successfully!",
            accessToken: token,
            name: user.name,
            hasPremium: user.hasPremium,
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
          message: "Your account is blocked!",
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

const signup = async (req, res, next) => {
  const { name, email, password } = req.body.data;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(StatusCodes.BAD_REQUEST).json({
        title: "Authentication Error",
        message: email + " is already exist!",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const user = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, salt),
        hasPremium: false,
        isOnline: true,
        isAdmin: false,
        status: 0,
        salt: salt,
      });

      const savedUser = await user.save();

      savedUser.password = undefined;
      savedUser.salt = undefined;
      const token = tokenForUser(savedUser);

      res.status(StatusCodes.OK).json({
        title: "Authentication Success",
        message: email + " is registered successfully!",
      });
    }
  } catch (err) {
    next(err);
  }
};

const setOffline = async (req, res, next) => {
  try {
    const { email } = req.body.data;
    const existingUser = await User.findOne({ email });
    existingUser.isOnline = false;
    existingUser.save();
    res.status(StatusCodes.OK).json({
      title: "Authentication Success",
      message: email + " is logged out successfully!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signin,
  signup,
  setOffline,
};
