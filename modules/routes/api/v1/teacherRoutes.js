const { Router } = require("express");
const ImageUploader = require("../v1/middleware/ImageUploader")();

const router = Router();

// Controller
const courseControllers = require(`${config.path.controllers}/teacher/courseController`);
const episodeControllers = require(`${config.path.controllers}/teacher/episodeController`);

// Courses
router.post("/", ImageUploader.single("imageBanner"), courseControllers.create);
router.delete("/:id", courseControllers.destroy);
router.put("/:id", courseControllers.update);

// Episodes
router.post("/:courseId/episode", episodeControllers.create);
router.put("/episode/:episodeId", episodeControllers.update);
router.delete("/:courseId/episode/:episodeId", episodeControllers.delete);

router.use("/courses/", router);

module.exports = router;
