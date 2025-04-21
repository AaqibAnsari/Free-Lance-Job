import React, { useState, useEffect } from "react";
import BiddingSystem from "./BiddingSystem"; // Import BiddingSystem

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs"); // Fetch jobs from the backend
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data); // Set the jobs data in state
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleBidSubmit = async (bidData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${bidData.jobId}/bid`, {
        method: "PATCH", // Use PATCH method to update the bid count
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit bid");
      }
  
      // No need to store the response data if not used
      alert("Bid submitted successfully!");
  
      // Re-fetch the jobs after bid submission
      fetchJobs(); // Re-fetch jobs to get updated bid count
      setSelectedJob(null); // Close the bidding form
  
    } catch (err) {
      console.error("Error submitting bid:", err);
      alert("Failed to submit bid");
    }
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
          key={job._id}
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
          <p><strong>Bids:</strong> {job.bidCount}</p>
          <button
            onClick={() => setSelectedJob(job._id)} // Set the selected job when clicking the button
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

          {/* Display Bidding System only for selected job */}
          {selectedJob === job._id && <BiddingSystem jobId={job._id} onBidSubmit={handleBidSubmit} />}
        </div>
      ))}
    </div>
  );
};

export default FindJobs;
