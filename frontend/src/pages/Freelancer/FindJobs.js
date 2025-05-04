import React, { useState, useEffect } from "react";
import BiddingSystem from "./BiddingSystem"; // Import BiddingSystem
import Chatbot from "./ChatBot"; // Import Chatbot
const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetchJobs();

    // Load saved jobs from localStorage (optional feature for now)
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(saved);
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleBidSubmit = async (bidData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${bidData.jobId}/bid`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit bid");
      }

      alert("Bid submitted successfully!");
      fetchJobs(); // Refresh job list with updated bid count
      setSelectedJob(null);
    } catch (err) {
      console.error("Error submitting bid:", err);
      alert("Failed to submit bid");
    }
  };

  const handleSaveJob = async (jobId) => {
    // Get userId from localStorage (assumes localStorage has a user object)
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in.");
      return;
    }
  
    if (!savedJobs.includes(jobId)) {
      try {
        const response = await fetch("http://localhost:5000/api/jobs/saved-jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, jobId }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to save job");
        }
  
        const updated = [...savedJobs, jobId];
        setSavedJobs(updated);
        localStorage.setItem("savedJobs", JSON.stringify(updated));
        alert("Job saved!");
      } catch (err) {
        console.error("Error saving job:", err);
        alert(err.message || "Error saving job");
      }
    } else {
      alert("This job is already saved.");
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

          {/* Buttons Section */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
            <button
              onClick={() => setSelectedJob(job._id)}
              style={{
                background: "green",
                color: "white",
                padding: "8px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Bid on This Job
            </button>

            <button
              onClick={() => handleSaveJob(job._id)}
              style={{
                background: "dodgerblue",
                color: "white",
                padding: "8px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Save Job
            </button>
          </div>

          {/* Bidding system shown only for selected job */}
          {selectedJob === job._id && (
            <BiddingSystem jobId={job._id} onBidSubmit={handleBidSubmit} />
          )}
        </div>
      ))}
      <div style={{ marginTop: "40px", width: "100%", maxWidth: "500px" }}>
        <Chatbot />
      </div>
    </div>
  );
};

export default FindJobs;
