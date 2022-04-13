const path = require("path");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.js");
// require('../controller/')

//**********to retrieve a list of users
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

//**********to retrieve a user,
const getUserById = async (req, res) => {
  try {
    const response = await userModel.findOne({ _id: req.params.id });

    if (response) {
      res.status(200).json({
        data: response,
      });
    } else {
      res.status(404).json({
        errors: {
          msg: "data not found",
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

//**********create a new user
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

    if (response) {
      res.status(200).json({
        message: "User was added successfully",
      });
    } else {
      res.status(404).json({
        errors: {
          msg: "data not found",
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

//**********to modify an existing user record
const updateUser = async (req, res) => {
  let newUser;
  try {
    const response = await userModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );

    if (response) {
      res.status(200).json({
        message: "User was update successfully",
      });
    } else {
      res.status(404).json({
        errors: {
          msg: "data not found",
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

//**********to remove a user
const deleteUser = async (req, res) => {
  let newUser;
  try {
    const response = await userModel.findByIdAndDelete({ _id: req.params.id });

    if (response) {
      res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({
        errors: {
          msg: "data not found",
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

module.exports = { getUser, getUserById, addUser, updateUser, deleteUser };
