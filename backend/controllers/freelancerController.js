const FreelancerProfile = require('../models/FreeLancerProfile');

// Create or update freelancer profile
exports.createProfile = async (req, res) => {
  const { userId, name, skills, experience, bio, profileImage } = req.body;

  try {
    let profile = await FreelancerProfile.findOne({ userId });

    if (profile) {
      profile.name = name;
      profile.skills = skills;
      profile.experience = experience;
      profile.bio = bio;
      profile.profileImage = profileImage;
    } else {
      profile = new FreelancerProfile({ userId, name, skills, experience, bio, profileImage });
    }

    await profile.save();
    res.status(201).json({ message: "Profile updated successfully", profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a freelancer profile by user ID
exports.getProfile = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found." });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
