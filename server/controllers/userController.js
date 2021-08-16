const mongoose = require("mongoose");
const User = require("../models/User");
const sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const comparePassword = require("../models/User");

const generateAccessToken = (id) => {
  const payload = {
    id,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
};

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
  res.json({ user });
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

  const token = await jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "24h",
  });
  return res.json({ token });
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
