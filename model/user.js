const mongoose = require("mongoose");

const schema = userSchema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      emun: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("user", schema);
module.exports = model;
