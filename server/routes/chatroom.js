const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const chatroomController = require("../controllers/userController");

const { isAuthanticated } = require("../middlewares/auth");

router.post(
  "/create",
  isAuthanticated,
  catchErrors(chatroomController.createChatroom)
);

module.exports = router;
