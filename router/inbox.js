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
const attachmentUpload = require("../middleware/msg/attachmentUpload");

//to check inbox route
route.get("/", getMsg);
//create a new message
route.post("/", auth, attachmentUpload, createMessage);
//retrieve conversation
route.get("/conversation", getConversation);
//create a new conversation
route.post("/conversation", auth, createConversation);

module.exports = route;
