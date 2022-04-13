const express = require("express");

const route = express.Router();

//internal import
const {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller/user");

const { addUservalidator } = require("../middleware/user/userValidation");

const {
  updateUservalidator,
} = require("../middleware/user/editUserValidation");

const {
  validationHandler,
} = require("../middleware/common/checkValidation.js");

//to retrieve a list of users
route.get("/", getUser);
//to retrieve a user,
route.get("/:id", getUserById);
//create a new user
route.post("/", addUservalidator, validationHandler, addUser);
//to modify an existing user record
route.put("/:id", updateUservalidator, validationHandler, updateUser);
//to remove a user
route.delete("/:id", deleteUser);

module.exports = route;
