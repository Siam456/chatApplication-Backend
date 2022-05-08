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
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(
          __dirname,
          `/../../../clint/public/uploads/avater/${filename}`
        ),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  validationHandler,
};
