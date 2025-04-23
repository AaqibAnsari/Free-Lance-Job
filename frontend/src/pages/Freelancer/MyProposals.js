import React, { useState, useEffect } from "react";

const Proposals = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // Get freelancerId from localStorage
        const freelancerId = localStorage.getItem("userId");

        if (!freelancerId) {
          throw new Error("No freelancerId found in localStorage");
        }

        // Fetch proposals for the specific freelancer
        const response = await fetch(`http://localhost:5000/api/proposals/${freelancerId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch proposals");
        }

        const data = await response.json();
        setProposals(data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };

    fetchProposals();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", background: "#fff" }}>
      <h2>Proposals</h2>
      {proposals.length > 0 ? (
        proposals.map((proposal, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
            
            <p><strong>Bid Amount:</strong> ${proposal.bidAmount}</p>
            <p><strong>Proposal:</strong> {proposal.proposalText}</p>
            <p><strong>Job Description:</strong> {proposal.jobDescription}</p>
            <p><strong>Submitted on:</strong> {new Date(proposal.timestamp).toLocaleString()}</p>
            <p><strong>Status:</strong> {proposal.status}</p>
          </div>
        ))
      ) : (
        <p>No proposals available.</p>
      )}
    </div>
  );
};

export default Proposals;
