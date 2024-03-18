const { Router } = require("express");

// Controllers
const usersControllers = require(`${config.path.controllers}/admin/usersControllers`);
const commentsControllers = require(`${config.path.controllers}/students/commentControllers`);
const categoryControllers = require(`${config.path.controllers}/teacher/categoryControllers`);

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

// Comments Routes
router.delete("/comments/:id", commentsControllers.destroy);

// Category Routes
router.post("/category", categoryControllers.create)


module.exports = router;
