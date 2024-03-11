const { Router } = require("express");

// Controllers
const usersControllers = require(`${config.path.controllers}/admin/usersControllers`);

// Auth Middleware
const AuthMiddleware = require("./middleware/verifyToken");

const router = Router();

router.get("/", AuthMiddleware.verifyToken("admin"), usersControllers.index);
router.post("/", AuthMiddleware.verifyToken("admin"), usersControllers.create);
router.delete(
  "/remove/:id",
  AuthMiddleware.verifyToken("admin"),
  usersControllers.destroy
);
router.put(
  "/update-role/:id",
  AuthMiddleware.verifyToken("admin"),
  usersControllers.changeRole
);

module.exports = router;
