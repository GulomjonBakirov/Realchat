const mongoose = require("mongoose");
const Chatroom = require("../models/Chatroom");

exports.createChatroom = async (req, res, next) => {
  const { name } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets";

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) throw "Chatroom with that name already exists";

  const chatroom = new Chatroom({ name });
  await chatroom.save();

  res.json({ message: "Chatroom Created" });
};

exports.getAllChatrooms = async (req, res, next) => {
  const chatrooms = await Chatroom.find({});
  res.json({ chatrooms });
};

exports.getChatroomById = async (req, res, next) => {
  const id = req.params.id;
  console.log(req.params.id);
  const chatroom = await Chatroom.findById(id);
  res.json({ chatroom });
};
