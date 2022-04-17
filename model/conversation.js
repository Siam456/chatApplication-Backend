const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    creator: {
      id: mongoose.Types.ObjectId,
      name: String,
      avater: String,
    },
    participator: {
      id: mongoose.Types.ObjectId,
      name: String,
      avater: String,
    },
    last_updated: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const msgModel = mongoose.model("message", conversationSchema);

module.exports = msgModel;
