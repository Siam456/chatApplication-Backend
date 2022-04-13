const express = require("express");

const route = express.Router();

//internal import
const { getUser, addUser, updateUser } = require("../controller/user");

route.get("/", getUser);
route.post("/", addUser);
route.put("/:id", updateUser);

module.exports = route;
