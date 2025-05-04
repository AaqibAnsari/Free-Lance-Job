const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const FreelancerProfile = require("../models/FreelancerProfile");

// Multer setup for file uploads
const upload = multer({
  dest: "uploads/", // File destination folder
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB size limit
  },
  fileFilter(req, file, cb) {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, JPEG, and PNG are allowed."), false);
    }
  },
});

router.put("/manage", upload.fields([{ name: "resumePdf" }, { name: "profilePhoto" }]), async (req, res) => {
  const { userId, githubLink, linkedinLink, bio } = req.body;
  const resumePdf = req.files.resumePdf ? req.files.resumePdf[0].path : undefined;
  const profilePhoto = req.files.profilePhoto ? req.files.profilePhoto[0].path : undefined;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const updateFields = {};
    if (githubLink) updateFields.githubLink = githubLink;
    if (linkedinLink) updateFields.linkedinLink = linkedinLink;
    if (bio) updateFields.bio = bio;
    if (resumePdf) updateFields.resumePdf = resumePdf;
    if (profilePhoto) updateFields.profilePhoto = profilePhoto;

    const updatedProfile = await FreelancerProfile.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, upsert: false }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Freelancer profile not found" });
    }

    res.status(200).json({ message: "Profile updated", profile: updatedProfile });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await FreelancerProfile.findById(userId);

    if (!profile) {
      return res.status(404).json({ message: "Freelancer profile not found" });
    }

    res.status(200).json({ profile });
  } catch (err) {
    console.error("Fetch profile error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
