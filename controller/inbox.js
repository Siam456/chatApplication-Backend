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


module.exports = { getMsg, createMessage };
