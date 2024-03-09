const { Router } = require("express");

const router = Router();

// Controller
const courseControllers = require(`${config.path.controllers}/teacher/courseController`);
const episodeControllers = require(`${config.path.controllers}/teacher/episodeController`);

// Episodes
router.post("/:courseId/episode", episodeControllers.create);
router.put("/episode/:episodeId", episodeControllers.update);

// Courses
router.post("/", courseControllers.create);
router.delete("/:id", courseControllers.destroy);
router.put("/:id", courseControllers.update);

router.use("/courses/", router);

module.exports = router;
