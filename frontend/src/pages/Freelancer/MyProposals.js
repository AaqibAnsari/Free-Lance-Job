import React, { useState, useEffect } from "react";

const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const [popupMessage, setPopupMessage] = useState(""); // Stores message for popup
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedProposals = JSON.parse(localStorage.getItem("proposals")) || [
      {
        jobId: "job1",
        bidAmount: 500,
        proposal: "I am an expert developer. I can complete this within a week.",
        freelancerId: "freelancer101",
        timestamp: "2025-03-22 10:30 AM",
        status: "Pending",
      },
      {
        jobId: "job2",
        bidAmount: 300,
        proposal: "I have 5 years of experience in this field. Looking forward!",
        freelancerId: "freelancer102",
        timestamp: "2025-03-21 09:15 AM",
        status: "Pending",
      },
    ];
    setProposals(storedProposals);
  }, []);

  const updateProposalStatus = (index, newStatus) => {
    const updatedProposals = [...proposals];
    updatedProposals[index].status = newStatus;
    setProposals(updatedProposals);
    localStorage.setItem("proposals", JSON.stringify(updatedProposals));

    // Show popup based on status
    if (newStatus === "Accepted") {
      setPopupMessage("Proposal Accepted Successfully!");
    } else if (newStatus === "Rejected") {
      setPopupMessage("Proposal Rejected Successfully!");
    }
    setShowPopup(true);
    
    // Hide popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
      setPopupMessage("");
    }, 2000);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", background: "#fff" }}>
      <h2>Proposals</h2>
      
      {proposals.length > 0 ? (
        proposals.map((proposal, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
            <p><strong>Freelancer ID:</strong> {proposal.freelancerId}</p>
            <p><strong>Bid Amount:</strong> ${proposal.bidAmount}</p>
            <p><strong>Proposal:</strong> {proposal.proposal}</p>
            <p><strong>Submitted on:</strong> {proposal.timestamp}</p>
            <p><strong>Status:</strong> {proposal.status}</p>
            <button
              style={{ background: "green", color: "white", padding: "5px 10px", marginRight: "10px", cursor: "pointer", border: "none", borderRadius: "5px" }}
              onClick={() => updateProposalStatus(index, "Accepted")}
            >
              Accept
            </button>
            <button
              style={{ background: "red", color: "white", padding: "5px 10px", cursor: "pointer", border: "none", borderRadius: "5px" }}
              onClick={() => updateProposalStatus(index, "Rejected")}
            >
              Reject
            </button>
          </div>
        ))
      ) : (
        <p>No proposals available.</p>
      )}

      {/* Popup Notification for Accept & Reject */}
      {showPopup && (
        <div style={{
          position: "fixed", bottom: "20px", right: "20px", background: popupMessage.includes("Accepted") ? "green" : "red",
          color: "#fff", padding: "10px 20px", borderRadius: "5px", boxShadow: "0px 4px 8px rgba(0,0,0,0.2)"
        }}>
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default Proposals;
