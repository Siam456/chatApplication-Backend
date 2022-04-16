const express = require("express");

const route = express.Router();

//internal import
const { getMsg } = require("../controller/inbox");

//to check inbox route
route.get("/", getMsg);

module.exports = route;
