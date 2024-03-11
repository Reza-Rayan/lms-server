const path = require("path");

module.exports = {
  port: 5000,
  uri: "mongodb://127.0.0.1:27017/lms",
  secretKey: "FDdser1fcs123$#dfG1!!",
  path: {
    controllers: path.resolve("./modules/controllers/v1"),
    models: path.resolve("./modules/models"),
    validation: path.resolve("./modules/validations"),
  },
};
