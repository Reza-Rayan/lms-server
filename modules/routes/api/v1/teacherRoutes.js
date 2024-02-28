const { Router } = require("express");

const router = Router();

// Controller
const courseControllers = require("../../../controllers/v1/teacher/courseController");

router.post("/", courseControllers.create);
router.get("/", courseControllers.index);

router.use("/courses/", router);

module.exports = router;
