import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageJobs = () => {
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

  useEffect(() => {
    // Get jobs from localStorage or initialize with default jobs
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || defaultJobs;
    setJobs(storedJobs);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Jobs</h2>
      <ul style={styles.jobList}>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <li key={index} style={styles.jobItem}>
              <div style={styles.jobDetails}>
                <strong style={styles.jobTitle}>{job.title}</strong>
                <span style={styles.jobCategory}>{job.category}</span>
              </div>
              <div style={styles.jobDescription}>{job.description}</div>
              <div style={styles.jobFooter}>
                <span style={styles.jobBudget}>${job.budget}</span> | 
                <span style={styles.jobDeadline}>Deadline: {job.deadline}</span>
              </div>
            </li>
          ))
        ) : (
          <p style={styles.noJobs}>No jobs available.</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  jobList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  jobItem: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  jobItemHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },
  jobDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  jobTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#007bff',
  },
  jobCategory: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '14px',
  },
  jobDescription: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
  },
  jobFooter: {
    fontSize: '14px',
    color: '#777',
    display: 'flex',
    justifyContent: 'space-between',
  },
  jobBudget: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  jobDeadline: {
    fontStyle: 'italic',
  },
  noJobs: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
  },
};

export default ManageJobs;
