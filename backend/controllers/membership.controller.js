const Memberships = require("../db/models/membership");
const SecretKeys = require("../db/models/secretKey");
const User = require("../db/models/user");
const { StatusCodes } = require("http-status-codes");

const getMemberShipInfo = async (req, res, next) => {
  const data = {};
  try {
    await Memberships.find().then((result) => {
      data.price = result[0].price;
    });
    await SecretKeys.find().then((key) => {
      data.key = key[0].secretKey;
    });
    res.status(StatusCodes.OK).json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updatePremiumStatus = async (req, res, next) => {
  try {
    const { email } = req.body.data;
    const response = await User.findOneAndUpdate(
      { email },
      { hasPremium: true }
    );
    if (response) {
      res.status(StatusCodes.OK).json({
        message: "Update Successfully!",
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Update Unsuccessfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMemberShipInfo,
  updatePremiumStatus,
};
