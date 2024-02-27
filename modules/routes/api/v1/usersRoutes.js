const { Router } = require("express");
const avatarUploader = require("../../../utils/AvatarUploader")


// Controllers
const usersControllers = require("../../../controllers/v1/students/usersControllers");

const router = Router();

router.post("/sign-up", avatarUploader.single("avatar"),usersControllers.signup);
router.post("/login", usersControllers.login);
router.get("/:id", usersControllers.single);
router.put("/:id", usersControllers.update)

module.exports = router;
