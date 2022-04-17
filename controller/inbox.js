const conversationModel = require("../model/conversation");
const messageModel = require("../model/message");

const getMsg = async (req, res) => {
  try {
    const response = await messageModel.find({});
    if (response) {
      res.status(200).json({
        response,
      });
    } else {
      res.status(500).json({
        errors: {
          msg: "There was an error",
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: err.message,
      },
    });
  }
};
const createMessage = async (req, res) => {
  console.log(req.body);
  const message = new messageModel({
    text: req.body.text,
    sender: req.user,
    conversation_id: req.body.conversation_id,

    receiver: req.body.receiver,
  });

  const response = await message.save();

  global.io.emit("chat message", {
    text: req.body.text,
    sender: req.user,
    conversation_id: req.body.conversation_id,

    receiver: req.body.receiver,
  });
  if (response) {
    res.status(200).json({
      response,
    });
  } else {
    res.status(500).json({
      errors: {
        msg: "There was an error",
      },
    });
  }
};
const getConversation = async (req, res) => {
  try {
    const response = await conversationModel.find({});
    if (response) {
      res.status(200).json({
        response,
      });
    } else {
      res.status(500).json({
        errors: {
          msg: "There was an error",
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: err.message,
      },
    });
  }
};

const createConversation = async (req, res) => {
  try {
    const conversation = new conversationModel({
      creator: {
        id: req.user._id,
        name: req.user.name,
        avater: req.user.avater || null,
      },
      participator: {
        id: req.body._id,
        name: req.body.name,
        avater: req.body.avater || null,
      },
    });

    const response = await conversation.save();
    if (response) {
      res.status(200).json({
        message: "conversation was added successfully",
      });
    } else {
      res.status(500).json({
        errors: {
          msg: "There was an error",
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: err.message,
      },
    });
  }
};

module.exports = { getMsg, createMessage, createConversation, getConversation };
