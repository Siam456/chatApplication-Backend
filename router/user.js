const express = require("express");

const route = express.Router();

//internal import
const {
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controller/user");

route.get("/", getUser);
route.post("/", addUser);
route.put("/:id", updateUser);
route.delete("/:id", deleteUser);

module.exports = route;
