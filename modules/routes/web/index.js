const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Welocome to Home Page of WEB");
});

module.exports = router;
