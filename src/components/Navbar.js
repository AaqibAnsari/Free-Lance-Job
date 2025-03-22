import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ userType }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoText}>Freelance<span style={styles.logoHighlight}>Hub</span></Link>
      </div>

      {userType && (
        <ul style={styles.navLinks}>
          <li><Link to="/">Home</Link></li>

          {/* **Freelancer Links** */}
          {userType === "freelancer" && (
            <>
              <li><Link to="/freelancer/dashboard">Dashboard</Link></li>
              <li><Link to="/freelancer/find-jobs">Find Jobs</Link></li>
              <li><Link to="/freelancer/my-proposals">My Proposals</Link></li>
              <li><Link to="/freelancer/messages">Messages</Link></li>

              <li style={styles.dropdown}>
                <Link to="/freelancer/profile">Profile ▼</Link>
                <ul style={styles.dropdownMenu}>
                  <li><Link to="/freelancer/edit-profile">Edit Profile</Link></li>
                  <li><Link to="/auth/logout">Logout</Link></li>
                </ul>
              </li>
            </>
          )}

          {/* **Client Links** */}
          {userType === "client" && (
            <>
              <li><Link to="/client/dashboard">Dashboard</Link></li>
              <li><Link to="/client/post-job">Post a Job</Link></li>
              <li><Link to="/client/my-jobs">My Jobs</Link></li>
              <li><Link to="/client/ReviewProposals">Review Proposals</Link></li>
              

              <li style={styles.dropdown}>
                <Link to="/client/profile">Profile ▼</Link>
                <ul style={styles.dropdownMenu}>
                  <li><Link to="/client/edit-profile">Edit Profile</Link></li>
                  <li><Link to="/auth/logout">Logout</Link></li>
                </ul>
              </li>
            </>
          )}

          {/* **Admin Links** */}
          {userType === "admin" && (
            <>
              <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
              <li><Link to="/admin/manage-users">Manage Users</Link></li>
              <li><Link to="/admin/manage-jobs">Manage Jobs</Link></li>
              <li><Link to="/admin/reports">Reports</Link></li>

              <li style={styles.dropdown}>
                <Link to="/admin/settings">Settings ▼</Link>
                <ul style={styles.dropdownMenu}>
                  <li><Link to="/admin/profile">Profile</Link></li>
                  <li><Link to="/auth/logout">Logout</Link></li>
                </ul>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

// **Minimal Styling with Inline CSS**
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: "10px 20px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  logoText: {
    textDecoration: "none",
    color: "#fff",
  },
  logoHighlight: {
    color: "#FFD700", // Gold color for contrast
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "15px",
  },
  dropdown: {
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    display: "none",
    minWidth: "150px",
  },
};

export default Navbar;
