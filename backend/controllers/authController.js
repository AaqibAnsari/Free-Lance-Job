const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword, userType });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login a user (Basic password check)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password." });

    res.json({ message: "Login successful", userId: user._id, userType: user.userType });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
