const path = require("path");
// require('../controller/')

const getUser = (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
};

module.exports = { getUser };
