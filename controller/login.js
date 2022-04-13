const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getlogin = (req, res) => {
  res.send("sasasa");
};

const postLogin = async (req, res) => {
  try {
    const response = await userModel.findOne({
      $or: [
        { phone: req.body.email },
        { name: req.body.email },
        { email: req.body.email },
      ],
    });

    const checkpass = await bcrypt.compare(
      req.body.password,
      response.password
    );

    if (checkpass) {
      const userObj = {
        name: response.name,
        email: response.email,
        phone: response.phone,
        avater: response.avater,
        role: response.role,
        _id: response._id,
      };
      const token = jwt.sign(userObj, process.env.JWT_SECRATE, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      //   console.log(token);
      //set cookies
      res.cookie(process.env.COOKIE_NAME, token, {
        maxAge: process.env.JWT_EXPIRE,
        signed: true,
      });
      res.json({
        msg: "Login Successfully",
      });
    } else {
      res.status(500).json({
        errors: "login failed",
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: err.message,
    });
  }
};

module.exports = { getlogin, postLogin };
