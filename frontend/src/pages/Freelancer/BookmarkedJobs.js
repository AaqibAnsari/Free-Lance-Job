import React, { useState, useEffect } from "react";
import BiddingSystem from "./BiddingSystem";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch saved jobs on mount
  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/saved-jobs?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch saved jobs");
      }
      const data = await response.json();
      setSavedJobs(data);
    } catch (err) {
      console.error("Error fetching saved jobs:", err);
      alert("Error fetching saved jobs");
    }
  };

  const handleBidSubmit = async (bidData) => {
    const userId=localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in");
      return;
    }

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
      fetchSavedJobs(); // Refresh the list to reflect bid count
      setSelectedJob(null);
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
      <h2 style={{ marginBottom: "20px" }}>Saved Jobs</h2>

      {savedJobs.length === 0 ? (
        <p>No saved jobs found.</p>
      ) : (
        savedJobs.map((job) => (
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
            <h3>{job.jobId?.title || "Saved Job"}</h3>
            <p>{job.description}</p>
            <p><strong>Budget:</strong> ${job.budget}</p>
            <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
            <p><strong>Category:</strong> {job.category}</p>

            <button
              onClick={() => setSelectedJob(job.jobId)} // open BiddingSystem
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

            {selectedJob === job.jobId && (
              <BiddingSystem jobId={job.jobId} onBidSubmit={handleBidSubmit} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SavedJobs;
