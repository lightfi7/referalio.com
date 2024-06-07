const { StatusCodes } = require("http-status-codes");
const Memberships = require("../db/models/membership");
const TestProgram = require("../db/models/testProgram");
const Niches = require("../db/models/niches");
const Platforms = require("../db/models/platforms");
const Geolocations = require("../db/models/geolocation");

const getData = async (req, res, next) => {
  try {
    const { page, hasPremium, params, premiumExpired } = req.body.data;
    const membership = await Memberships.findOne();
    const freeNum = membership?.freeNumber;
    const limit = 50;
    const offset = (page - 1) * limit;
    let query = {};
    const {
      text,
      niches,
      platform,
      geolocation,
      hideInter,
      minPercent,
      maxPercent,
      minAmount,
      maxAmount,
      easytoJoin,
      relationShip,
      payment,
      type,
      productType,
      hide,
      direct,
      isPromoted,
    } = params;
    let fields = ["tags", "platform"];
    [geolocation].forEach((item, index) => {
      if (item?.length)
        query["langs.country_code"] = {
          $in: item.map((i) => i.country_code),
        };
    });

    [niches, platform].forEach((item, index) => {
      if (item?.length)
        query[`${fields[index]}.name`] = {
          $in: item.map((i) => i.name),
        };
    });

    if (text) query.name = { $regex: text, $options: "i" };
    if (hideInter) query.is_international = { $ne: 1 };
    if (minPercent) query.commission_in_percentage = { $gte: minPercent / 100 };
    if (maxPercent) query.commission_in_percentage = { $lte: maxPercent / 100 };
    if (minAmount) query.commission_amount = { $gte: parseFloat(minAmount) };
    if (maxAmount) query.commission_amount = { $lte: parseFloat(maxAmount) };
    if (easytoJoin !== 0)
      query.average_ratings = {
        easy_to_join: `${easytoJoin}`,
        relationship: `${relationShip}`,
        payment_deadline: `${payment}`,
      };
    if (type?.trim()) query.commission_type = type;
    if (type === "All") query = {};
    if (productType?.trim())
      query["product_type.machine_name"] = productType
        .split(" ")
        .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
        .join("_");
    if (productType === "All") query = {};
    if (direct) query["platform.name"] = "Direct";
    if (hasPremium) {
      if (premiumExpired) {
        TestProgram.aggregate([
          {
            $match: query,
          },
          {
            $skip: offset,
          },
          {
            $limit: limit,
          },
        ]).then(async (result) => {
          const pages = await TestProgram.find(query).countDocuments();
          res.status(StatusCodes.OK).json({
            message: "success",
            data: result,
            pages: Math.ceil(pages / 50),
            total: pages,
          });
        });
      } else {
        TestProgram.aggregate([
          {
            $limit: freeNum,
          },
          {
            $match: query,
          },
          {
            $skip: offset,
          },
          {
            $limit: limit,
          },
        ]).then((result) => {
          const pages = result.length == 0 ? 1 : result.length;
          res.status(StatusCodes.OK).json({
            message: "success",
            data: result,
            pages: Math.ceil(pages / 50),
          });
        });
      }
    } else {
      TestProgram.aggregate([
        {
          $limit: freeNum,
        },
        {
          $match: query,
        },
        {
          $skip: offset,
        },
        {
          $limit: limit,
        },
      ]).then((result) => {
        const pages = result.length == 0 ? 1 : result.length;
        res.status(StatusCodes.OK).json({
          message: "success",
          data: result,
          pages: Math.ceil(pages / 50),
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

const getInfo = async (req, res, next) => {
  try {
    const { data: id } = req.body;
    if (id) {
      const data = await TestProgram.findOne({ _id: id });
      if (data) {
        res.status(StatusCodes.OK).json({ data });
      } else {
        res.status(StatusCodes.NOT_FOUND).send("No data found with given ID");
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).send("ID is required");
    }
  } catch (error) {
    next(error);
  }
};

const getSearchData = async (req, res, next) => {
  try {
    const nicheData = await Niches.find({});
    const platformData = await Platforms.find({});
    const geolocationData = await Geolocations.find({});
    res.status(StatusCodes.OK).json({
      nicheData: nicheData,
      platformData: platformData,
      geolocationData: geolocationData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getData,
  getInfo,
  getSearchData,
};
