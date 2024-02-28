const express = require("express");

const router = express.Router();

// Children Routes
const userRoutes = require("./v1/usersRoutes");
const adminRoutes = require("./v1/adminRoutes");
const teacherRoutes = require("./v1/teacherRoutes");

router.get("/", (req, res) => {
  res.json("Welocome to Home Page of API");
});

// user Routes
router.use("/student", userRoutes);
router.use("/teacher", teacherRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
