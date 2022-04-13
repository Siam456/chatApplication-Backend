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

//error handler
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("there was an error");
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("There was an error");
    }
  }
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
