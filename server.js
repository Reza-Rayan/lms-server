const express = require("express");
const cors = require("cors");

const config = require("./modules/config");
global.config = require("./modules/config");

const app = express();

//Connect To Database
const connectDB = require("./modules/utils/ConnectDB");
connectDB;

// Platform Configurations
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: "application/json" }));
app.use(cors());

app.get("/", (req, res) => {
  res.json("Home Page API");
});

app.listen(config.port, () =>
  console.log(`Server is Running on port :${config.port}`)
);
