import React, { useState } from "react";

const BiddingSystem = ({ jobId, onBidSubmit }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");

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
      freelancerId: "freelancer123", // This should come from authentication
    };

    // Call parent function to handle bid submission
    onBidSubmit(bidData);
    alert("Bid Submitted Successfully!");
    setBidAmount("");
    setProposal("");
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
        <button type="submit" style={{ background: "blue", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}>
          Submit Bid
        </button>
      </form>
    </div>
  );
};

export default BiddingSystem;
