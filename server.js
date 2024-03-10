const express = require("express");
const cors = require("cors");

const config = require("./modules/config");
global.config = require("./modules/config");

const apiRoutes = require("./modules/routes/api");
const webRoutes = require("./modules/routes/web");

const app = express();

//Connect To Database
const connectDB = require("./modules/utils/ConnectDB");
connectDB;

// Platform Configurations
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: "application/json" }));
app.use("/uploads", express.static("uploads"));

app.use(cors());

// Define Routes
app.use("/api", apiRoutes);
app.use("/", webRoutes);

app.listen(config.port, () =>
  console.log(`Server is Running on port:${config.port}`)
);
