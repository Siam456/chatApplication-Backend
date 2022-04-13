const express = require("express");

const route = express.Router();

//internal import
const { getUser } = require("../controller/user");

route.get("/", getUser);

module.exports = route;
