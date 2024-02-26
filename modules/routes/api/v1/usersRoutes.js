const { Router } = require("express");

// Controllers
const UsersControllers = require("../../../controllers/v1/usersControllers");

const router = Router();

router.post("/sign-up", UsersControllers.signup);

router.post("/login", (req, res) => {
  res.json("Login Route");
});

module.exports = router;
