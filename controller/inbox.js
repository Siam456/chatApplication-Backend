const conversationModel = require("../model/conversation");

const getMsg = (req, res) => {
  res.send("siam");
};
const createMessage = (req, res) => {
  res.send(req.body.text);

  global.io.emit("chat message", {
    msg: req.body.text,
    sender: {
      user: req.user,
    },
  });
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
    console.log(req.user);
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
