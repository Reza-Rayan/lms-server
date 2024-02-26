const mongoose = require("mongoose");

class ConnectDB {
  constructor() {
    this.connection();
  }

  connection() {
    mongoose
      .connect(config.uri)
      .then(() => {
        console.log(`Connected to database`);
      })
      .catch((error) => {
        console.log("There is error in connection", error);
      });
  }
}

module.exports = new ConnectDB();
