const { Router } = require("express");

const router = Router();

// Controller
const courseControllers = require(`${config.path.controllers}/teacher/courseController`);
const episodeControllers = require(`${config.path.controllers}/teacher/episodeController`);

// Episodes
router.post("/:id/episode", episodeControllers.create);

// Courses
router.post("/", courseControllers.create);
router.delete("/:id", courseControllers.destroy);
router.put("/:id", courseControllers.update);

router.use("/courses/", router);

module.exports = router;
