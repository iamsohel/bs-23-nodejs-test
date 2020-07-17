const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const keys = require("../config/keys");
const jwtAuth = require("../middleware/jwtAuth");

// @route  POST api/user/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const validateRegisterInput = require("../validation/register");
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).send(errors);
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    errors.email = "User already registered.";
    return res.status(400).send(errors);
  }
  const newUser = new User(req.body);
  const hashValue = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, hashValue);
  try {
    const data = await newUser.save();
    const token = jwt.sign(
      {
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      },
      keys.secretKey,
      { expiresIn: "6h" }
    );
    const resObj = {
      success: true,
      token: token,
      message: "User registered successfully",
    };
    res.status(200).send(resObj);
  } catch (error) {
    console.log(error);
    const resObj = {
      success: false,
      message: "something went wrong",
    };
    res.status(500).send(resObj);
  }
});

// @route  POST api/users/login
// @desc Login user/ Returning JWT token
// @access Public
router.post("/login", async (req, res) => {
  const validateLoginInput = require("../validation/login");
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).send(errors);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      errors.email = "email or password is not correct.";
      return res.status(400).send(errors);
    }
    const verify = await bcrypt.compare(req.body.password, user.password);
    if (!verify) {
      errors.password = "email or password is not correct.";
      return res.status(400).send(errors);
    }
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      keys.secretKey,
      { expiresIn: "6h" }
    );
    const resObj = {
      success: true,
      token: token,
    };
    res.status(200).send(resObj);
  } catch (error) {
    console.log(error);
    const resObj = {
      success: false,
      message: "something went wrong",
    };
    res.status(500).send(resObj);
  }
});

// @access Private
router.put("/profile", jwtAuth, async (req, res) => {
  try {
    const updatedProfile = await User.findByIdAndUpdate(
      req.user.id,
      { name: req.body.name },
      { new: true }
    );
    const resObj = {
      success: true,
      data: { name: updatedProfile.name },
    };
    res.status(200).send(resObj);
  } catch (error) {
    console.log(error);
    const resObj = {
      success: false,
      message: "something went wrong",
    };
    res.status(500).send(resObj);
  }
});

module.exports = router;
