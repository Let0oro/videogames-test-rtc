const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token");

async function registerUser(req, res, next) {
  try {
    const user = new User(req.body);
    const userExist = await User.findOne({ email: user.email });
    if (userExist) return next(new Error("User already exist"));

    const userDB = await user.save();
    return res.status(201).json(userDB.name);
  } catch (err) {
    return next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!!!user) return next(new Error("User not found"));
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      return res.status(200).json(token);
    }
  } catch (err) {
    return next(err);
  }
}

async function logoutUser(req, res, next) {
  try {
    const token = null;
    return res.status(201).json(token);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
