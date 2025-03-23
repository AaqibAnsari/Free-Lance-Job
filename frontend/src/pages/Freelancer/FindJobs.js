import React, { useState } from "react";
import BiddingSystem from "./BiddingSystem"; // Import BiddingSystem

const FindJobs = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Website Development", budget: 500, description: "Looking for a web developer." },
    { id: 2, title: "Graphic Design", budget: 300, description: "Need a logo and branding." },
  ]);

  const [selectedJob, setSelectedJob] = useState(null);

  const handleBidSubmit = (bidData) => {
    console.log("Bid Submitted:", bidData);
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
      <h2 style={{ marginBottom: "20px" }}>Find Jobs</h2>

      {jobs.map((job) => (
        <div 
          key={job.id} 
          style={{ 
            border: "1px solid #ddd", 
            padding: "15px", 
            borderRadius: "8px", 
            width: "100%", 
            maxWidth: "400px", 
            background: "#f9f9f9",
            marginBottom: "15px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p><strong>Budget:</strong> ${job.budget}</p>
          <button
            onClick={() => setSelectedJob(job.id)}
            style={{ 
              background: "green", 
              color: "white", 
              padding: "8px 15px", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Bid on This Job
          </button>

          {selectedJob === job.id && <BiddingSystem jobId={job.id} onBidSubmit={handleBidSubmit} />}
        </div>
      ))}
    </div>
  );
};

export default FindJobs;
