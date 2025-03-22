import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReviewProposals = () => {
  const { jobId } = useParams(); // Get job ID from URL
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    // Fetch proposals for this job
    fetch(`/api/jobs/${jobId}/proposals`)
      .then((res) => res.json())
      .then((data) => setProposals(data))
      .catch((error) => console.error("Error fetching proposals:", error));
  }, [jobId]);

  // Accept Proposal
  const handleAccept = (proposalId) => {
    fetch(`/api/jobs/${jobId}/proposals/${proposalId}/accept`, {
      method: "POST",
    })
      .then(() => {
        alert("Proposal accepted!");
        setProposals((prev) => prev.filter((p) => p._id !== proposalId));
      })
      .catch((error) => console.error("Error accepting proposal:", error));
  };

  // Reject Proposal
  const handleReject = (proposalId) => {
    fetch(`/api/jobs/${jobId}/proposals/${proposalId}/reject`, {
      method: "POST",
    })
      .then(() => {
        alert("Proposal rejected.");
        setProposals((prev) => prev.filter((p) => p._id !== proposalId));
      })
      .catch((error) => console.error("Error rejecting proposal:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Review Proposals</h2>
      {proposals.length === 0 ? (
        <p>No proposals yet.</p>
      ) : (
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
              <h3>{proposal.freelancerName}</h3>
              <p><strong>Bid:</strong> ${proposal.amount}</p>
              <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
              <button onClick={() => handleAccept(proposal._id)} style={{ marginRight: "10px", backgroundColor: "green", color: "white" }}>
                Accept
              </button>
              <button onClick={() => handleReject(proposal._id)} style={{ backgroundColor: "red", color: "white" }}>
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewProposals;
