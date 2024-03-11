const { Router } = require("express");
const avatarUploader = require("./middleware/avatarUploader");

// Controllers
const usersControllers = require(`${config.path.controllers}/students/usersControllers`);
const courseControllers = require(`${config.path.controllers}/students/courseControllers`);

const router = Router();
// Auth Middleware
const AuthMiddleware = require("./middleware/verifyToken");

// Courses Routes
router.get(
  "/courses",
  AuthMiddleware.verifyToken("student"),
  courseControllers.index
);
router.get("/courses/:id", courseControllers.signle);

// User Management Routes
router.post("/sign-up", usersControllers.signup);
router.post("/login", usersControllers.login);
router.get("/:id", usersControllers.single);
router.put(
  "/:id",
  AuthMiddleware.verifyToken("student"),
  usersControllers.update
);
router.post(
  "/upload-avatar/:id",
  AuthMiddleware.verifyToken("student"),
  avatarUploader.single("avatar"),
  usersControllers.uploadAvatar
);

module.exports = router;
