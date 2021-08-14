require("dotenv").config();

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

app.listen(5000, () => {
  console.log("Server listen 5000 port");
});
