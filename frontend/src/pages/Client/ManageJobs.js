import React, { useState, useEffect } from "react";

const JobList = () => {
  // Default job data (in case no jobs are stored in localStorage)
  const defaultJobs = [
    {
      title: "Frontend Developer",
      description: "Build a responsive website using React.",
      budget: 500,
      deadline: "2025-04-30",
      category: "Web Development",
    },
    {
      title: "Logo Designer",
      description: "Design a logo for a startup company.",
      budget: 200,
      deadline: "2025-05-15",
      category: "Graphic Design",
    },
  ];

  const [jobs, setJobs] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let storedJobs = JSON.parse(localStorage.getItem("jobs"));
    
    // If localStorage is empty or not found, use defaultJobs
    if (!storedJobs || storedJobs.length === 0) {
      storedJobs = defaultJobs;
      localStorage.setItem("jobs", JSON.stringify(defaultJobs)); // Set default jobs to localStorage
    }
    
    setJobs(storedJobs);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Job Listings</h2>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <div key={index} style={styles.jobCard}>
            <h3 style={styles.jobTitle}>{job.title}</h3>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Budget:</strong> ${job.budget}</p>
            <p><strong>Deadline:</strong> {job.deadline}</p>
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
