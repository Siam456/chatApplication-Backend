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

const auth = require("../middleware/common/auth");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const avaterUpload = require("../middleware/user/avatarUpload");

//to retrieve a list of users
route.get("/", getUser);
//to retrieve a user,
route.get("/:id", auth, getUserById);
//create a new user
route.post("/", upload.none(), addUservalidator, validationHandler, addUser);
//to modify an existing user record
route.put(
  "/:id",
  auth,
  avaterUpload,
  updateUservalidator,
  validationHandler,
  updateUser
);
//to remove a user
route.delete("/:id", auth, deleteUser);

module.exports = route;
