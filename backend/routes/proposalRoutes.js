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
router.get("/client/:clientId", async (req, res) => {
  console.log("Proposals for client route hit");
  try {
    const { clientId } = req.params;
    // 1a) find all jobs for this client
    const jobs = await Job.find({ clientId }).select("_id title description budget deadline");
    const jobIds = jobs.map(j => j._id);

    // 1b) find all proposals whose job is in that list
    const proposals = await Proposal
      .find({ job: { $in: jobIds } })
      .populate("freelancer", "fullName email")
      .populate("job", "_id");     // so we know proposal.job._id

    res.json({ jobs, proposals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------------------------------------------------------
// 2) Accept / Reject by proposalId
//    POST /api/proposals/:proposalId/accept
//    POST /api/proposals/:proposalId/reject
// ------------------------------------------------------------------
router.post("/:proposalId/accept", async (req, res) => {
  try {
    const { proposalId } = req.params;
    const prop = await Proposal.findById(proposalId);
    if (!prop) return res.status(404).json({ message: "Not found" });
    prop.status = "Accepted";
    await prop.save();
    // decrement bidCount on job
    await Job.findByIdAndUpdate(prop.job, { $inc: { bidCount: -1 } });
    res.json({ message: "Accepted", proposal: prop });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
router.post("/:proposalId/reject", async (req, res) => {
  try {
    const { proposalId } = req.params;
    const prop = await Proposal.findById(proposalId);
    if (!prop) return res.status(404).json({ message: "Not found" });
    prop.status = "Rejected";
    await prop.save();
    res.json({ message: "Rejected", proposal: prop });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
