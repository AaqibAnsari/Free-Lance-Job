const express = require("express");
const Proposal = require("../models/Proposal");
const Job = require("../models/Job");
const router = express.Router();

// POST - Submit a new proposal
router.post("/", async (req, res) => {
    console.log("Proposal route hit");
  try {
    const { jobId, bidAmount, proposalText, freelancerId } = req.body;

    const newProposal = new Proposal({
      job: jobId,
      freelancer: freelancerId,
      bidAmount,
      proposalText,
    });

    await newProposal.save();
    res.status(201).json(newProposal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:freelancerId", async (req, res) => {
    console.log("Proposals get route hit");
    try {
      const { freelancerId } = req.params;
  
      const proposals = await Proposal.find({ freelancer: freelancerId })
        .populate("job", "description") // Populate job field and select only 'description'
        .exec();
  
      const result = proposals.map((proposal) => ({
        _id: proposal._id,
        bidAmount: proposal.bidAmount,
        proposalText: proposal.proposalText,
        status: proposal.status,
        timestamp: proposal.timestamp,
        jobDescription: proposal.job.description,
      }));
  
      res.json(result);
    } catch (err) {
      console.error("Error fetching proposals:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

// GET - Proposals for a specific job (for clients)
router.get("/job/:jobId", async (req, res) => {
  try {
    const proposals = await Proposal.find({ job: req.params.jobId }).populate("freelancer", "fullName email");
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Proposals by a freelancer
router.get("/freelancer/:freelancerId", async (req, res) => {
  try {
    const proposals = await Proposal.find({ freelancer: req.params.freelancerId }).populate("job");
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
