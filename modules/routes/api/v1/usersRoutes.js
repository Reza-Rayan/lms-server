const { Router } = require("express");
const avatarUploader = require("../v1/middleware/AvatarUploader");

// Controllers
const usersControllers = require("../../../controllers/v1/students/usersControllers");

const router = Router();

router.post("/sign-up", usersControllers.signup);
router.post("/login", usersControllers.login);
router.get("/:id", usersControllers.single);
router.put("/:id", usersControllers.update);
router.post(
  "/upload-avatar/:id",
  avatarUploader.single("avatar"),
  usersControllers.uploadAvatar
);

module.exports = router;
