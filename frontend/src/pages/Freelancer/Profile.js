import React, { useEffect, useState } from "react";

const FreelancerProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("freelancerProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  return (
    <div className="profile-page">
      <h2>Freelancer Profile</h2>
      {profile ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Skills:</strong> {profile.skills}</p>
          <p><strong>Experience:</strong> {profile.experience} years</p>
          <p><strong>Portfolio:</strong> <a href={profile.portfolio} target="_blank">View</a></p>
        </div>
      ) : (
        <p>No profile found. <a href="/profile-creation">Create One</a></p>
      )}
    </div>
  );
};

export default FreelancerProfile;
