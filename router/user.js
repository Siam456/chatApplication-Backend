const express = require("express");

const route = express.Router();

//internal import
const { getUser, addUser } = require("../controller/user");

route.get("/", getUser);
route.post("/", addUser);

module.exports = route;
