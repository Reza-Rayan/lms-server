const { Router } = require("express");
const imageUploader = require("../v1/middleware/ImageUploader");

const router = Router();

// Controller
const courseControllers = require(`${config.path.controllers}/teacher/courseControllers`);
const episodeControllers = require(`${config.path.controllers}/teacher/episodeControllers`);

// Courses
router.post("/", imageUploader.single("banner"), courseControllers.create);
router.delete("/:id", courseControllers.destroy);
router.put("/:id", courseControllers.update);

// Episodes
router.post("/:courseId/episode", episodeControllers.create);
router.put("/episode/:episodeId", episodeControllers.update);
router.delete("/:courseId/episode/:episodeId", episodeControllers.delete);

router.use("/courses", router);

module.exports = router;
