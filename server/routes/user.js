const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const { isAuthanticated } = require("../middlewares/auth");

const userController = require("../controllers/userController");

router.post("/login", catchErrors(userController.login));
// router.get("/logout", catchErrors(userController.logout));
router.post("/register", catchErrors(userController.register));
router.get("/me", isAuthanticated, catchErrors(userController.loadUser));

module.exports = router;
