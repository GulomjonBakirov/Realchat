require("dotenv").config();
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection error: " + err.message);
});
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

//Bring in the models
require("./models/User");
require("./models/Chatroom");
require("./models/Message");

const server = app.listen(4000, () => {
  console.log("Server listen 4000 port");
});

const io = require("socket.io")(server, { cors: { origin: "*" } });

const Message = mongoose.model("Message");
const User = mongoose.model("User");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;

    const decoded = await jwt.verify(token, process.env.SECRET);
    socket.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
  }
});

io.on("connection", (socket) => {
  console.log(`connected: ${socket.userId}`);

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.userId}`);
  });
  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log(chatroomId);
    console.log(`A user joined the room ${chatroomId}`);
  });
  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log(`A user left the room ${chatroomId}`);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });

      await newMessage.save();
    }
  });
});
