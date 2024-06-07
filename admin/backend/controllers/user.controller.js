const User = require("../db/models/user");

const { StatusCodes } = require("http-status-codes");

const getUser = (req, res, next) => {
  try {
    User.find()
      .then((userData) => {
        if (userData.length != 0) {
          res.status(StatusCodes.OK).json({
            userData,
          });
        } else {
          res.status(StatusCodes.OK).json({
            message: "No Users",
          });
        }
      })
      .catch((err) => {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: err,
        });
      });
  } catch (error) {
    next(error);
  }
};

const addUser = async (req, res, next) => {
  try {
    const { email, name, password, salt, hasPremium } = req.body.data;
    await User.findOne({ email })
      .then((existUser) => {
        if (existUser) {
          res.status(StatusCodes.BAD_REQUEST).json({
            message: email + "is already exist!",
          });
        } else {
          const newUser = { email, name, password, salt, hasPremium };
          newUser
            .save()
            .then(() => {
              res.status(StatusCodes.OK).json({
                message: email + "is added successfully!",
              });
            })
            .catch((err) => {
              res.status(StatusCodes.BAD_REQUEST).json({
                message: err,
              });
            });
        }
      })
      .catch((err) => {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: err,
        });
      });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.body.data;
    if (email !== "admin@gmail.com") {
      User.deleteOne({ email })
        .then(() => {
          res.status(StatusCodes.OK).json({
            message: "User is removed successfully!",
          });
        })
        .catch((err) => {
          res.status(StatusCodes.BAD_REQUEST).json({
            message: err,
          });
        });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Access denied!",
      });
    }
  } catch (error) {
    next(error);
  }
};

const blockUser = async (req, res, next) => {
  try {
    const { email, status } = req.body.data;

    if (email !== "admin@gmail.com") {
      try {
        await User.findOneAndUpdate({ email }, { status: status == 1 ? 0 : 1 });
        res.status(StatusCodes.OK).json({ message: "Access success!" });
      } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Access denied!" });
    }
  } catch (error) {
    next(error);
  }
};

const updateUserData = async (req, res, next) => {
  const { email, plan, startDate, endDate } = req.body.data;  
  let hasPremium = false;
  if (plan[0].name === "Starter") {
    hasPremium = false;
  } else {
    hasPremium = true;
  }
  if (email !== "admin@gmail.com") {
    try {
      await User.findOneAndUpdate(
        { email },
        { hasPremium: hasPremium, startson: startDate, endson: endDate }
      );
      res.status(StatusCodes.OK).json({ message: "Access success!" });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Access denied!" });
  }
};

module.exports = {
  getUser,
  addUser,
  deleteUser,
  blockUser,
  updateUserData,
};
