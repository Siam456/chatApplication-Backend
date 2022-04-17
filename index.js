const express = require("express");
const app = express();

var bodyParser = require("body-parser");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//cookie parser
app.use(cookieParser(process.env.COOKIE_PARSER));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for parsing application/json
app.use(bodyParser.json());

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//database connection
mongoose
  .connect(process.env.MONGOOSE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("successfully connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//internal export

const userRouter = require("./router/user");
const loginRoute = require("./router/login");
const inboxRoute = require("./router/inbox");

//routes
app.use("/user", userRouter);
app.use("/login", loginRoute);
app.use("/inbox", inboxRoute);

global.io = io;

global.io.on("connection", (socket) => {
  console.log("connected");
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
