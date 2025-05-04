// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const FreelancerProfile = require("../models/FreelancerProfile"); // Assuming you have a FreelancerProfile model
const router = express.Router();

router.post("/register", async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role: role.toLowerCase(),
    });

    const savedUser = await newUser.save();

    // If role is freelancer, create an empty FreelancerProfile linked to this user
    if (savedUser.role === "freelancer") {
      console.log("Creating FreelancerProfile for user:", savedUser._id);
      const newProfile = new FreelancerProfile({
        _id: savedUser._id,  // Use _id directly as userId
        githubLink: "",
        linkedinLink: "",
        bio: "",
        resumePdf: "",
        profilePhoto: ""
      });

      await newProfile.save();
    }

    res.status(201).json({ message: "User registered successfully", user: savedUser });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  console.log("Login route hit");
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.role !== role.toLowerCase()) {
      return res.status(403).json({ message: "Incorrect role selected" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Optional: Send back minimal info (or add JWT later)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.get("/freelancer", async (req, res) => {
  try {
    const { email } = req.query; // Get email from query string
    const freelancer = await User.findOne({ email });

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.json({ freelancerId: freelancer._id });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
