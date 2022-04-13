const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

const path = require("path");
const { unlink } = require("fs");

const validationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  validationHandler,
};
