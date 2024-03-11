const { Router } = require("express");
const imageUploader = require("../v1/middleware/imageUploader");
const videoUploader = require("./middleware/VideoUploader");

const router = Router();

// Auth Middleware
const AuthMiddleware = require("./middleware/verifyToken");
// Controller
const courseControllers = require(`${config.path.controllers}/teacher/courseControllers`);
const episodeControllers = require(`${config.path.controllers}/teacher/episodeControllers`);

// Courses
router.post(
  "/",
  AuthMiddleware.verifyToken("teacher"),
  imageUploader.single("banner"),
  courseControllers.create
);
router.delete(
  "/:id",
  AuthMiddleware.verifyToken("teacher"),
  courseControllers.destroy
);
router.put(
  "/:id",
  AuthMiddleware.verifyToken("teacher"),
  courseControllers.update
);

// Episodes
router.post(
  "/:courseId/episode",
  videoUploader.single("videoURL"),
  episodeControllers.create
);
router.put(
  "/episode/:episodeId",
  videoUploader.single("videoURL"),
  episodeControllers.update
);
router.delete("/:courseId/episode/:episodeId", episodeControllers.delete);

router.use("/courses", router);

module.exports = router;
