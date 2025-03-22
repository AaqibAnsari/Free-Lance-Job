const JobPost = require('../models/JobPost');

// Create a new job post
exports.createJob = async (req, res) => {
  const { clientId, title, description, budget, requiredSkills, deadline } = req.body;

  try {
    const job = new JobPost({ clientId, title, description, budget, requiredSkills, deadline });
    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all job posts
exports.getJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find().populate('clientId', 'email');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
