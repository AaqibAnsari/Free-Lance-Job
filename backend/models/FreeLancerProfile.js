const mongoose = require('mongoose');

const freelancerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  skills: [{ type: String, required: true }],
  experience: { type: String },
  bio: { type: String },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FreelancerProfile', freelancerProfileSchema);
