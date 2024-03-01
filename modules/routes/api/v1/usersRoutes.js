const { Router } = require("express");
const avatarUploader = require("../v1/middleware/AvatarUploader");

// Controllers
const usersControllers = require(`${config.path.controllers}/students/usersControllers`);
const courseControllers = require(`${config.path.controllers}/students/courseControllers`)

const router = Router();

// Courses Routes
router.get("/courses", courseControllers.index)
router.get("/courses/:id", courseControllers.signle)


// User Management Routes
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
