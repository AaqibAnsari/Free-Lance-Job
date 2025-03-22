const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  requiredSkills: [{ type: String, required: true }],
  deadline: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobPost', jobPostSchema);
