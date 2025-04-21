import React, { useState, useEffect } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const clientId = localStorage.getItem("userId"); // Retrieve clientId from localStorage

      if (!clientId) {
        setError("No client found. Please log in.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/jobs/client?clientId=${clientId}`);

        const data = await response.json();

        if (response.ok) {
          setJobs(data);  // Set the jobs data in state
        } else {
          setError(data.message || "Failed to fetch jobs.");
        }
      } catch (err) {
        setError("Server error. Please try again later.");
        console.error(err);
      }
    };

    fetchJobs();
  }, []); // This effect runs once when the component mounts

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Job Listings</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <div key={index} style={styles.jobCard}>
            <h3 style={styles.jobTitle}>{job.title}</h3>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Budget:</strong> ${job.budget}</p>
            <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
            <p><strong>Category:</strong> {job.category}</p>
          </div>
        ))
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  jobCard: {
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  jobTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default JobList;
