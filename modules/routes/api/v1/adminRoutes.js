const { Router } = require("express");

// Controllers
const usersControllers = require(`${config.path.controllers}/admin/usersControllers`);

const router = Router();

router.get("/", usersControllers.index);
router.post("/", usersControllers.create)
router.delete("/remove/:id", usersControllers.destroy);
router.put("/update-role/:id",usersControllers.changeRole)

module.exports = router;
