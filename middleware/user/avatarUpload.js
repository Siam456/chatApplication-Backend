const uploader = require("../../util/singleUploader");

const avaterUpload = (req, res, next) => {
  const upload = uploader(
    "/avater",
    ["image/jpeg", "image/jpg", "image/png"],
    2000000,
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

module.exports = avaterUpload;
