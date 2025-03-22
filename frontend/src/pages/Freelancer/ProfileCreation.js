import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCreation = () => {
  const [profile, setProfile] = useState({
    name: "",
    skills: "",
    experience: "",
    portfolio: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("freelancerProfile", JSON.stringify(profile));
    alert("Profile Created Successfully!");
    navigate("/freelancer/profile");
  };

  return (
    <div className="profile-creation">
      <h2>Create Your Freelancer Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="skills" placeholder="Skills (comma-separated)" onChange={handleChange} required />
        <input type="text" name="experience" placeholder="Years of Experience" onChange={handleChange} required />
        <input type="url" name="portfolio" placeholder="Portfolio Link" onChange={handleChange} />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileCreation;
