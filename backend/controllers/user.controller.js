import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const registerUser = async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const checkUser = await User.findOne({ username });
  if (checkUser)
    return res.status(400).json({ message: "User already exists" });
  const newuser = new User({
    username,
    password: hashedPassword,
  });
  try {
    const response = await newuser.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ user: user, access_token: token });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const userExists = await User.findById(id);
  if (!userExists) return res.status(404).json({ message: "User not found" });
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
};

export const forgotPassword = async (req, res, next) => {
  const { username } = req.body;
  console.log("The username", username);
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, 10);
  try {
    const response = await User.findOneAndUpdate(
      { username: username },
      {
        $set: {
          resetToken: hash,
          expireToken: Date.now() + 10 * 60 * 60,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Token generated successfully", response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res, next) => {
  const { password, resetToken } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.findOne({
      resetToken: resetToken,
    });

    const tokenExpiration = new Date(user.expireToken).getTime();
    if (tokenExpiration < Date.now()) {
      return res.status(404).json({ message: "Token expired" });
    } else {
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.expireToken = undefined;
      await user.save();
      res.status(200).json({ message: "Password reset successfully", user });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
