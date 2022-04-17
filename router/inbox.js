const express = require("express");

const route = express.Router();

//internal import
const {
  getMsg,
  createMessage,
  createConversation,
  getConversation,
} = require("../controller/inbox");
const auth = require("../middleware/common/auth");

//to check inbox route
route.get("/", getMsg);
//create a new message
route.post("/", auth, createMessage);
//retrieve conversation
route.get("/conversation", getConversation);
//create a new conversation
route.post("/conversation", auth, createConversation);

module.exports = route;
