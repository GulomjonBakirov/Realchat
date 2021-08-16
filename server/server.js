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

const io = require("socket.io")(server);

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const decoded = await jwt.verify(token, process.env.SECRET);
    socket.userId = decoded._id;
    next();
  } catch (error) {}
});

io.on("connection", (socket) => {
  console.log(`connected: ${socket.userId}`);

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.userId}`);
  });
});
