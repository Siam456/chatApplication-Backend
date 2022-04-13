const path = require("path");
const bcrypt = require("bcrypt");
// require('../controller/')

const getUser = (req, res) => {
  res.send("suiam");
};
const addUser = async (req, res) => {
  res.send("post siam");
};

module.exports = { getUser, addUser };
