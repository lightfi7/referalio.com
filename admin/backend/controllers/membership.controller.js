const Memberships = require("../db/models/membership");
const MembershipPlan = require("../db/models/membershipPlan");
const { StatusCodes } = require("http-status-codes");

const setFreeNumber = async (req, res) => {
  try {
    const { freeNumber } = req.body.data;
    const freeNum = parseInt(freeNumber);

    await Memberships.findOneAndUpdate(
      {},
      { freeNumber: freeNum },
      { sort: { _id: 1 } }
    );

    res.status(StatusCodes.OK).json({
      message: "Update successfully!",
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const setPrice = async (req, res) => {
  try {
    const { price } = req.body.data;
    const priceVal = parseInt(price);

    await Memberships.findOneAndUpdate({}, { price: priceVal });

    res.status(StatusCodes.OK).json({
      message: "Update successfully!",
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const getMemberShipPlan = (req, res) => {
  try {
    MembershipPlan.find().then((plans) => { 
      res.status(StatusCodes.OK).json({
        data: plans,
      });
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  setFreeNumber,
  setPrice,
  getMemberShipPlan,
};
