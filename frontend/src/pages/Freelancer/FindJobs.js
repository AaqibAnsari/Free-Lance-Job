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
    <div>
      <h2>Find Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p><strong>Budget:</strong> ${job.budget}</p>
          <button
            onClick={() => setSelectedJob(job.id)}
            style={{ background: "green", color: "white", padding: "8px", border: "none", cursor: "pointer" }}
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
