const uploader = require("../../util/uploader");

const attachmentUpload = (req, res, next) => {
  const upload = uploader(
    "/attachment",
    ["image/jpeg", "image/jpg", "image/png"],
    10000000,
    5,
    "Only .jpg, .jpeg, .png allowed!!"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avater: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = attachmentUpload;
