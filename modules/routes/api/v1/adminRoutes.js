const { Router } = require("express");

// Controllers
const usersControllers = require("../../../controllers/v1/admin/usersControllers");

const router = Router();

router.get("/", usersControllers.index);
router.post("/", usersControllers.create)
router.delete("/remove/:id", usersControllers.destroy);
router.put("/update-role/:id",usersControllers.changeRole)

module.exports = router;
