const User = require("../db/models/user");
const TestProgram = require("../db/models/testProgram");
const { StatusCodes } = require("http-status-codes");

const getDashBoardInfo = async (req, res, next) => {
  try {
    let totalUsers = 0;
    let totalPrograms = 0;
    let totalSales = 0;
    let totalPromoted = 0;
    let data = [];

    totalUsers = await User.countDocuments().exec();
    totalPrograms = await TestProgram.countDocuments().exec();
    totalPromoted = await TestProgram.countDocuments({
      promoted: 1,
    }).exec();

    data.push({
      totalSales,
      totalUsers,
      totalPrograms,
      totalPromoted,
    });
    res.status(StatusCodes.OK).json({ data });
    data = [];
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashBoardInfo,
};
