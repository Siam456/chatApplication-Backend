const express = require("express");

const route = express.Router();

//internal import
const { getlogin, postLogin } = require("../controller/login");

//to check login route
route.get("/", getlogin);
//to login a user
route.post("/", postLogin);

module.exports = route;
