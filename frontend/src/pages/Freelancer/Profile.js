import React, { useEffect, useState } from "react";

const FreelancerProfile = () => {
  const [profile, setProfile] = useState({
    bio: "",
    githubLink: "",
    linkedinLink: "",
    resumePdf: "",
    profilePhoto: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [fileError, setFileError] = useState("");
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/freelancer/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setProfile(data.profile);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile", err);
        setLoading(false);
      });
  }, [userId]);

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "resumePdf") {
      setSelectedResume(files[0]);
    } else if (name === "profilePhoto") {
      setSelectedProfilePhoto(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setFileError("");

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("bio", profile.bio);
      formData.append("githubLink", profile.githubLink);
      formData.append("linkedinLink", profile.linkedinLink);
      if (selectedResume) formData.append("resumePdf", selectedResume);
      if (selectedProfilePhoto) formData.append("profilePhoto", selectedProfilePhoto);

      const response = await fetch("http://localhost:5000/api/freelancer/manage", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage(data.message || "Error updating profile.");
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage("Error updating profile.");
    }
  };

  if (!userId) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        User not logged in.
      </p>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "#4f46e5",
          }}
        >
          Freelancer Profile
        </h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Bio
              </label>
              <textarea
                name="bio"
                value={profile.bio || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                GitHub Link
              </label>
              <input
                type="url"
                name="githubLink"
                value={profile.githubLink || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                LinkedIn Link
              </label>
              <input
                type="url"
                name="linkedinLink"
                value={profile.linkedinLink || ""}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Resume PDF
              </label>
              <input
                type="file"
                name="resumePdf"
                onChange={handleFileChange}
                accept="application/pdf"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              {fileError && (
                <p style={{ color: "red", marginTop: "0.5rem" }}>{fileError}</p>
              )}
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Profile Photo
              </label>
              <input
                type="file"
                name="profilePhoto"
                onChange={handleFileChange}
                accept="image/*"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#4f46e5",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>

            {message && (
              <p style={{ textAlign: "center", marginTop: "1rem", color: "green" }}>
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;
