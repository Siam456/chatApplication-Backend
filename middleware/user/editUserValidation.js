const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const user = require("../../model/user.js");
const path = require("path");
const { unlink } = require("fs");

const updateUservalidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email").isEmail().withMessage("Invalid email address").trim(),
  check("phone")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Must be a valid Bangladeshi Phone Number"),
];

module.exports = {
  updateUservalidator,
};
