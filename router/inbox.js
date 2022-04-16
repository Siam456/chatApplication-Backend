const express = require("express");

const route = express.Router();

//internal import
const { getMsg, createMessage } = require("../controller/inbox");
const auth = require("../middleware/common/auth");

//to check inbox route
route.get("/", getMsg);
//create a new message
route.post("/", auth, createMessage);

module.exports = route;
