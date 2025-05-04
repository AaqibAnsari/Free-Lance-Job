import React, { useState, useEffect } from "react";
import axios from "axios"; // For API requests

const BiddingSystem = ({ jobId, onBidSubmit }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [proposals, setProposals] = useState([]);
  const [freelancerId, setFreelancerId] = useState("");
  const [isFreelancer, setIsFreelancer] = useState(false);

  // Get freelancer ID based on email (you need to know the email of the current user)
  

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedUserType = localStorage.getItem("userType");
    const storedUserId=localStorage.getItem('userId')
    setFreelancerId(storedUserId);
    // Check if the user is a freelancer
    if (storedUserType === "freelancer") {
      setIsFreelancer(true);
     // fetchFreelancerId(storedEmail); // Fetch freelancer ID based on email
    } else {
      setIsFreelancer(false); // The user is not a freelancer, so disable bidding
    }

    // Load proposals from localStorage on mount
    const storedProposals = JSON.parse(localStorage.getItem("proposals")) || [];
    setProposals(storedProposals);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!bidAmount || !proposal || !freelancerId) {
      alert("Please enter a bid amount, proposal, and make sure you're logged in as a freelancer.");
      return;
    }
    const checkRes = await fetch(`http://localhost:5000/api/proposals/check?jobId=${jobId}&freelancerId=${freelancerId}`);
    const checkData = await checkRes.json();
  
    if (checkData.exists) {
      alert("You have already submitted a proposal for this job.Please wait for the client to respond.");
      return;
    }
  
    const bidData = {
      jobId,
      bidAmount,
      proposalText: proposal, // backend expects `proposalText`
      freelancerId,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/proposals/", {
        // Note the trailing slash ----------------^
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bidData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit proposal");
      }
  
      const result = await response.json();
  
      // Update local proposals (optional UI logic)
      const updatedProposals = [result, ...proposals];
      localStorage.setItem("proposals", JSON.stringify(updatedProposals));
      setProposals(updatedProposals);
  
      alert("Bid Submitted Successfully!");
      setBidAmount("");
      setProposal("");
  
      // Optionally update the parent
      onBidSubmit({ jobId, bidAmount });
    } catch (err) {
      console.error("Error submitting bid:", err);
      alert("Failed to submit your bid. Please try again.");
    }
  };
  
  return (
    <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
      <h3>Place Your Bid</h3>
      {isFreelancer ? (
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
      ) : (
        <p>You must be logged in as a freelancer to place a bid.</p>
      )}
    </div>
  );
};

export default BiddingSystem;
