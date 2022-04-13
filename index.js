const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//internal export

const userRouter = require("./router/user");

//routes
app.use("/user", userRouter);

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", "siam: " + msg);
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
