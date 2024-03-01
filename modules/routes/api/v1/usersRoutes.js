const { Router } = require("express");
const avatarUploader = require("../v1/middleware/AvatarUploader");

// Controllers
const usersControllers = require("../../../controllers/v1/students/usersControllers");
const courseControllers = require("../../../controllers/v1/students/courseControllers")

const router = Router();

// User Management Routes
router.post("/sign-up", usersControllers.signup);
router.post("/login", usersControllers.login);
router.get("/:idcourseControllers", usersControllers.single);
router.put("/:id", usersControllers.update);
router.post(
  "/upload-avatar/:id",
  avatarUploader.single("avatar"),
  usersControllers.uploadAvatar
  );

// Courses Routes
router.get("/", courseControllers.index)


module.exports = router;
