const { Router } = require("express");

// Controllers
const usersControllers = require("../../../controllers/v1/admin/usersControllers");

const router = Router();

router.get("/", usersControllers.index);
router.delete("/remove/:id", usersControllers.destroy);

module.exports = router;
