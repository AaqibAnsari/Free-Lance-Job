const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// POST /api/jobs — create a job
router.post("/", async (req, res) => {
  const { title, description, budget, deadline, category, clientId } = req.body;

  // Validate fields
  if (!title || !description || !budget || !deadline || !category || !clientId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newJob = new Job({
      title,
      description,
      budget: Number(budget),          // Ensure budget is numeric
      deadline: new Date(deadline),    // Ensure proper date format
      category,
      clientId,                        // Store reference to client
      bidCount: 0                      // Defaults to 0 anyway, but explicit is good
    });

    console.log("Job to be saved:", newJob);  // Log job data before saving
await newJob.save();


    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/", async (req, res) => {
    try {
      const jobs = await Job.find();  // Fetch all jobs
      res.status(200).json(jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err); // Log full error details
      res.status(500).json({
        message: "Server error",
        error: err.message,
        stack: err.stack, // Include stack trace for more context
      });
    }
  });
  
  // GET /api/jobs/client — get jobs by clientId
  router.get("/client", async (req, res) => {
    const clientId = req.query.clientId;  // Get clientId from query params
  
    if (!clientId) {
      return res.status(400).json({ message: "clientId is required" });
    }
  
    try {
      const jobs = await Job.find({ clientId });  // Find jobs by clientId
      res.status(200).json(jobs);
    } catch (err) {
      console.error("Error fetching jobs for client:", err);
      res.status(500).json({
        message: "Server error",
        error: err.message,
        stack: err.stack, // Include stack trace for more context
      });
    }
  });
  
  // PATCH /api/jobs/:id/bid - increment the bid count
router.patch("/:id/bid", async (req, res) => {
    try {
      const job = await Job.findByIdAndUpdate(
        req.params.id,
        { $inc: { bidCount: 1 } }, // Increment bidCount by 1
        { new: true }
      );
      res.status(200).json(job);
    } catch (err) {
      console.error("Error incrementing bid count:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
  

module.exports = router;
