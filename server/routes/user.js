const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");

const userController = require("../controllers/userController");

router.post("/login", catchErrors(userController.login));
router.get("/logout", catchErrors(userController.logout));
router.post("/register", catchErrors(userController.register));

module.exports = router;
