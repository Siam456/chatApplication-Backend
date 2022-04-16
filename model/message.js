const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    text: {
      type: String,
      require: true,
    },
    attachment: [
      {
        type: String,
      },
    ],
    sender: {
      id: mongoose.Types.ObjectId,
      name: String,
      avater: String,
    },
    receiver: {
      id: mongoose.Types.ObjectId,
      name: String,
      avater: String,
    },
    date_time: {
      type: Date,
      default: Date.now(),
    },
    conversation_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
