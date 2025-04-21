import React, { useState, useEffect } from "react";

const BiddingSystem = ({ jobId, onBidSubmit }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [proposals, setProposals] = useState([]);

  // Load proposals from localStorage on mount
  useEffect(() => {
    const storedProposals = JSON.parse(localStorage.getItem("proposals")) || [];
    setProposals(storedProposals);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bidAmount || !proposal) {
      alert("Please enter a bid amount and proposal.");
      return;
    }

    const bidData = {
      jobId,
      bidAmount,
      proposal,
      freelancerId: "freelancer123", // Placeholder (should come from auth)
      timestamp: new Date().toLocaleString(),
      status: "Pending",
    };

    const updatedProposals = [bidData, ...proposals];

    // Store updated proposals in localStorage (or send to backend)
    localStorage.setItem("proposals", JSON.stringify(updatedProposals));
    setProposals(updatedProposals);

    alert("Bid Submitted Successfully!");
    setBidAmount("");
    setProposal("");

    // Call parent method to increment bid count in backend
    onBidSubmit({ jobId, bidAmount });
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
      <h3>Place Your Bid</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bid Amount ($):</label>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div>
          <label>Proposal:</label>
          <textarea
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          ></textarea>
        </div>
        <button
          type="submit"
          style={{
            background: "blue",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Submit Bid
        </button>
      </form>
    </div>
  );
};

export default BiddingSystem;
