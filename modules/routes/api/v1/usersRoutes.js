const { Router } = require("express");

// Controllers
const usersControllers = require("../../../controllers/v1/students/usersControllers");

const router = Router();

router.post("/sign-up", usersControllers.signup);
router.post("/login", usersControllers.login);
router.get("/:id", usersControllers.single);

module.exports = router;
