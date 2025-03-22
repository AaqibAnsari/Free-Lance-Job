import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FreelancerDashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("freelancerProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  return (
    <div style={{
      maxWidth: "800px",
      margin: "20px auto",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9"
    }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Freelancer Dashboard</h2>

      {/* Profile Summary */}
      <div style={{
        padding: "15px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        marginBottom: "15px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
      }}>
        <h3 style={{ color: "#555" }}>Profile Overview</h3>
        {profile ? (
          <>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Skills:</strong> {profile.skills}</p>
            <p><strong>Experience:</strong> {profile.experience} years</p>
            <p><strong>Portfolio:</strong> <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">View</a></p>
            <Link to="/freelancer/profile" style={buttonStyle}>Edit Profile</Link>
          </>
        ) : (
          <p>No profile found. <Link to="/profile-creation" style={{ color: "#007bff" }}>Create Profile</Link></p>
        )}
      </div>

      {/* Job Actions */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#555" }}>Job Opportunities</h3>
        <Link to="/freelancer/find-jobs" style={buttonStyle}>Find Jobs</Link>
        <Link to="/freelancer/my-proposals" style={buttonStyle}>My Proposals</Link>
      </div>

      {/* Reviews and Ratings */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#555" }}>Reviews & Ratings</h3>
        <Link to="/freelancer/reviews" style={buttonStyle}>View Reviews</Link>
      </div>

      {/* Messages and Notifications */}
      <div style={sectionStyle}>
        <h3 style={{ color: "#555" }}>Messages & Notifications</h3>
        <Link to="/freelancer/messages" style={buttonStyle}>Messages</Link>
        <Link to="/freelancer/notifications" style={buttonStyle}>Notifications</Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  display: "inline-block",
  margin: "8px 5px",
  padding: "10px 15px",
  backgroundColor: "#007bff",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "5px",
  transition: "background 0.3s",
  textAlign: "center"
};

const sectionStyle = {
  padding: "15px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  marginBottom: "15px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
};

export default FreelancerDashboard;
