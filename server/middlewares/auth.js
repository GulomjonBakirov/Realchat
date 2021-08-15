const jwt = require("jsonwebtoken");
const { catchErrors } = require("../handlers/errorHandler");
const errorHandler = require("../handlers/errorHandler");
const User = require("../models/User");

// Checks if user is authanticated or nor
exports.isAuthanticated = catchErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw "Login firstly";

  const decoded = jwt.verify(token, process.env.SECRET);
  req.user = await User.findById(decoded.id);
  next();
});
