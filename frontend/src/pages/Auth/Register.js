import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"; // Import styles

const Register = ({ setUserType }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserTypeState] = useState(""); // Store selected role

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!fullName || !email || !password || !confirmPassword || !userType) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Convert role to lowercase for consistency
    const normalizedUserType = userType.toLowerCase();

    // Store user type in localStorage
    localStorage.setItem("userType", normalizedUserType);
    setUserType(normalizedUserType); // Update global user type

    // Redirect based on user type
    if (normalizedUserType === "freelancer") {
      navigate("/profile-creation"); // Freelancers must create a profile
    } else if (normalizedUserType === "client") {
      navigate("/client-dashboard");
    } else if (normalizedUserType === "admin") {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <p>Sign up to get started</p>

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* User Type Selection */}
          <div className="input-group">
            <select
              value={userType}
              onChange={(e) => setUserTypeState(e.target.value)}
              required
            >
              <option value="">Select Account Type</option>
              <option value="freelancer">Freelancer</option>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="register-btn">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
