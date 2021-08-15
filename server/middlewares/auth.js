const jwt = require("jsonwebtoken");
const { catchErrors } = require("../handlers/errorHandler");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/User");

// Checks if user is authanticated or nor
exports.isAuthanticated = catchErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }

  const decoded = jwt.verify(token, process.env.SECRET);
  req.user = await User.findById(decoded.id);
  next();
});
