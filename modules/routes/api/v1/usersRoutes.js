const { Router } = require("express");

const router = Router();

router.post("/sign-up", (req, res) => {
  res.json("Sign up Route");
});

router.post("/login", (req, res) => {
  res.json("Login Route");
});

module.exports = router;
