const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = 8000;

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT} ...`);
});

io = socket(server);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("diconnect", () => {
    console.log("User disconnected");
  });
});
