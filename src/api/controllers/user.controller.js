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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!!!user) return next(new Error("User not found"));
    if (!!!bcrypt.compareSync(password, user.password)) {
      return next(new Error("Incorrect password"));
    }
    const token = generateToken(user._id, user.email);
    return res.status(200).json(token);
  } catch (err) {
    return next(err);
  }
}

async function logoutUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!!!user) return next(new Error("User not found"));
    if (!!bcrypt.compareSync(password, user.password)) {
      req.headers.authorization = null;
      return res
        .status(201)
        .json(
          `User ${req.body.email} has logged out, token: ${req.headers.authorization}`
        );
    } else {
      return next(new Error("Incorrect password!"));
    }
  } catch (err) {
    return next(err);
  }
}

async function changePasswordUser(req, res, next) {
  const { email, password, newPassword } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!!!user) return next(new Error("User not found"));
    if (!!bcrypt.compareSync(password, user.password)) {
      if (!!bcrypt.compareSync(newPassword, user.password))
        return next(new Error("Can't change with same password"));
      const passwordHashed = await bcrypt.hash(newPassword, 10);
      const userUpdated = await User.findOneAndUpdate(
        { email: email },
        { password: passwordHashed, name: "Changed" },
        { new: true }
      );
      return res.status(200).json(userUpdated);
    }
  } catch (err) {
    return next(err);
  }
}

async function removeUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!!!user) return next(new Error("User not found"));
    if (!!bcrypt.compareSync(password, user.password)) {
      await User.findOneAndDelete({ email: email });
      return res.status(200).json(`User ${email} has been deleted!`);
    }
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  removeUser,
  changePasswordUser,
};
