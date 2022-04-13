const path = require("path");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.js");
// require('../controller/')

const getUser = async (req, res) => {
  try {
    const response = await userModel.find({});

    res.status(200).json({
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: err.message,
      },
    });
  }
};
const addUser = async (req, res) => {
  let newUser;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(req.body.password, salt);

    newUser = new userModel({
      ...req.body,
      password: hashpass,
    });

    const response = await newUser.save();

    console.log(response);

    res.status(200).json({
      message: "User was added successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: err.message,
      },
    });
  }
};

const updateUser = async (req, res) => {
  let newUser;
  try {
    const response = await userModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.status(200).json({
      message: "User was update successfully",
    });
    // const hashPass = await bcrypt.hash(req.body.password, salt);

    // res.send(salt);
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: err.message,
      },
    });
  }
};
const deleteUser = async (req, res) => {
  let newUser;
  try {
    const response = await userModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: err.message,
      },
    });
  }
};

module.exports = { getUser, addUser, updateUser, deleteUser };
