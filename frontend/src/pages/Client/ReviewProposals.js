import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReviewProposals = () => {
  const { jobId } = useParams(); // Get job ID from URL
  const [proposals, setProposals] = useState([
    // ✅ Default proposals
    { _id: "1", freelancerName: "Alice Johnson", amount: 450, coverLetter: "I have 5+ years of experience in web development." },
    { _id: "2", freelancerName: "Bob Smith", amount: 500, coverLetter: "Expert in React & Node.js, ready to start immediately!" }
  ]);

  useEffect(() => {
    // Fetch proposals for this job
    fetch(`/api/jobs/${jobId}/proposals`)
      .then((res) => res.json())
      .then((data) => setProposals((prev) => [...prev, ...data])) // ✅ Append new proposals
      .catch((error) => console.error("Error fetching proposals:", error));
  }, [jobId]);

  // Accept Proposal
  const handleAccept = (proposalId) => {
    fetch(`/api/jobs/${jobId}/proposals/${proposalId}/accept`, { method: "POST" })
      .then(() => {
        alert("Proposal accepted!");
        setProposals((prev) => prev.filter((p) => p._id !== proposalId));
      })
      .catch((error) => console.error("Error accepting proposal:", error));
  };

  // Reject Proposal
  const handleReject = (proposalId) => {
    fetch(`/api/jobs/${jobId}/proposals/${proposalId}/reject`, { method: "POST" })
      .then(() => {
        alert("Proposal rejected.");
        setProposals((prev) => prev.filter((p) => p._id !== proposalId));
      })
      .catch((error) => console.error("Error rejecting proposal:", error));
  };

  return (
    <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "100vh", 
        textAlign: "center", 
        padding: "20px" 
    }}>
      <h2 style={{ marginBottom: "20px" }}>Review Proposals</h2>

      {proposals.length === 0 ? (
        <p>No proposals yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0, width: "100%", maxWidth: "500px" }}>
          {proposals.map((proposal) => (
            <li 
              key={proposal._id} 
              style={{ 
                border: "1px solid #ddd", 
                padding: "15px", 
                marginBottom: "10px", 
                borderRadius: "8px", 
                background: "#f9f9f9",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
              }}
            >
              <h3>{proposal.freelancerName}</h3>
              <p><strong>Bid:</strong> ${proposal.amount}</p>
              <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
              <div style={{ marginTop: "10px" }}>
                <button 
                  onClick={() => handleAccept(proposal._id)} 
                  style={{ 
                    marginRight: "10px", 
                    backgroundColor: "green", 
                    color: "white", 
                    padding: "8px 12px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Accept
                </button>
                <button 
                  onClick={() => handleReject(proposal._id)} 
                  style={{ 
                    backgroundColor: "red", 
                    color: "white", 
                    padding: "8px 12px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewProposals;
