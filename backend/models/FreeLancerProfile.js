const mongoose = require("mongoose");

const freelancerProfileSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  githubLink: {
    type: String,
    trim: true
  },
  linkedinLink: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    maxlength: 1000
  },
  resumePdf: {
    type: String
  },
  profilePhoto: {
    type: String
  }
}, {
  timestamps: true
});

// Use _id as alias for user field
freelancerProfileSchema.virtual('user').get(function () {
  return this._id;
});

module.exports = mongoose.model("FreelancerProfile", freelancerProfileSchema);