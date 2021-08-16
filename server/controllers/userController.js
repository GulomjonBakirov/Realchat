const mongoose = require("mongoose");
const User = require("../models/User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");
const sendToken = require("../utils/jwtToken");
const comparePassword = require("../models/User");

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password,
  });

  const userCheck = await User.findOne({
    email,
  });

  if (userCheck) throw "Email with same email already exists";

  await user.save();

  sendToken(user, 200, res);
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  }).select("+password");

  // console.log(sha256(password + process.env.SALT));

  if (!user) throw "Email or password is invalid";

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) throw "Valid password or email";

  sendToken(user, 200, res);
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

exports.loadUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.json({ success: true, user });
};
