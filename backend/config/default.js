module.exports = {
  port: process.env.PORT || 8002,
  tokenTimeout: 3600,
  appSecret: process.env.APP_SECRET || "Referalio",
  mongodb_uri: "mongodb://178.79.157.41:27017/mydb",
};
