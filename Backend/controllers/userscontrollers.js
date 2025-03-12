const User = require("../models/usersmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// تسجيل جديد
exports.register = async (req, res) => {
  const { name, email, password,phone } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    res.cookie("token", generateToken(user), { httpOnly: true });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// تسجيل الدخول
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.cookie("token", generateToken(user), { httpOnly: true });
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getProfile = (req, res) => {
  res.json({ user: req.user });
};

