const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");

const chatroomController = require("../controllers/chatroomController");

const { isAuthanticated } = require("../middlewares/auth");

router.post(
  "/create",
  isAuthanticated,
  catchErrors(chatroomController.createChatroom)
);
router.get(
  "/",
  isAuthanticated,
  catchErrors(chatroomController.getAllChatrooms)
);

router.get(
  "/",
  isAuthanticated,
  catchErrors(chatroomController.getChatroomById)
);

module.exports = router;
