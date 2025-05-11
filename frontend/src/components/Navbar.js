import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userType }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        {/* Logo Section */}
        <div style={styles.logoContainer}>
          <Link to="/" style={styles.logoLink}>
            <span style={styles.logoText}>Freelance</span>
            <span style={styles.logoHighlight}>Hub</span>
          </Link>
        </div>

        {/* Navigation Links */}
        {userType && (
          <div style={styles.navSection}>
            <ul style={styles.navList}>
              <li style={styles.navItem}>
                <Link to="/" style={styles.navLink}>
                  <span style={styles.linkIcon}>🏠</span>
                  <span>Home</span>
                </Link>
              </li>

              {/* Freelancer Links */}
              {userType === "freelancer" && (
                <>
                  <li style={styles.navItem}>
                    <Link to="/freelancer/dashboard" style={styles.navLink}>
                      <span style={styles.linkIcon}>📊</span>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/freelancer/find-jobs" style={styles.navLink}>
                      <span style={styles.linkIcon}>🔍</span>
                      <span>Find Jobs</span>
                    </Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/freelancer/my-proposals" style={styles.navLink}>
                      <span style={styles.linkIcon}>📝</span>
                      <span>Proposals</span>
                    </Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/freelancer/saved-jobs" style={styles.navLink}>
                      <span style={styles.linkIcon}>💾</span>
                      <span>Saved Jobs</span>
                    </Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/chat" style={styles.navLink}>
                      <span style={styles.linkIcon}>💬</span>
                      <span>Chat</span>
                    </Link>
                  </li>
                  <li style={styles.dropdown}>
                    <Link to="/freelancer/profile" style={styles.navLink}>
                      <span style={styles.linkIcon}>👤</span>
                      <span>Profile ▼</span>
                    </Link>
                    <ul style={styles.dropdownMenu}>
                      <li style={styles.dropdownItem}>
                        <Link to="/freelancer/edit-profile" style={styles.dropdownLink}>
                          Edit Profile
                        </Link>
                      </li>
                      
                    </ul>
                  </li>
                   <li style={styles.navItem}>
                        <button onClick={handleLogout} style={styles.logoutButton}>
                          Logout

                        </button>
                      </li>
                </>
              )}

              {/* Client Links */}
              {userType === "client" && (
                <>
                  <li style={styles.navItem}>
                    <Link to="/client/post-job" style={styles.navLink}>
                      <span style={styles.linkIcon}>📢</span>
                      <span>Post Job</span>
                    </Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/client/my-jobs" style={styles.navLink}>
                      <span style={styles.linkIcon}>📋</span>
                      <span>My Jobs</span>
                    </Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/client/ReviewProposals" style={styles.navLink}>
                      <span style={styles.linkIcon}>📑</span>
                      <span>Proposals</span>
                    </Link>
                  </li>
                  <li style={styles.dropdown}>
                    <Link to="/client/profile" style={styles.navLink}>
                      <span style={styles.linkIcon}>👤</span>
                      <span>Profile ▼</span>
                    </Link>
                    <ul style={styles.dropdownMenu}>
                      <li style={styles.dropdownItem}>
                        <Link to="/client/edit-profile" style={styles.dropdownLink}>
                          Edit Profile
                        </Link>
                      </li>

                    </ul>
                  </li>
                                        <li style={styles.navItem}>
                        <button onClick={handleLogout} style={styles.logoutButton}>
                          Logout

                        </button>
                      </li>
                </>
              )}

              {/* Admin Links */}
              {userType === "admin" && (
                <>
                  <li style={styles.navItem}>
                    <Link to="/admin/manage-users" style={styles.navLink}>
                      <span style={styles.linkIcon}>👥</span>
                      <span>Users</span>
                    </Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/admin/manage-jobs" style={styles.navLink}>
                      <span style={styles.linkIcon}>💼</span>
                      <span>Jobs</span>
                    </Link>
                  </li>
                  <li style={styles.dropdown}>
                    <Link to="/admin/settings" style={styles.navLink}>
                      <span style={styles.linkIcon}>⚙️</span>
                      <span>Settings ▼</span>
                    </Link>
                    <ul style={styles.dropdownMenu}>
                      <li style={styles.dropdownItem}>
                        <Link to="/admin/profile" style={styles.dropdownLink}>
                          Profile
                        </Link>
                      </li>
                     
                    </ul>
                  </li>
                   <li style={styles.navItem}>
                        <button onClick={handleLogout} style={styles.logoutButton}>
                          Logout
                        </button>
                   </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

// Modern Styling with original dropdown behavior
const styles = {
  navbar: {
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "0.5rem 2rem",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  navContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logoLink: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#2c3e50",
    transition: "all 0.3s ease",
    "&:hover": {
      opacity: 0.9,
    }
  },
  logoText: {
    color: "#2c3e50",
  },
  logoHighlight: {
    color: "#3498db",
    marginLeft: "0.3rem",
  },
  navSection: {
    display: "flex",
    alignItems: "center",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    alignItems: "center",
    gap: "1.5rem",
  },
  navItem: {
    position: "relative",
  },
  navLink: {
    textDecoration: "none",
    color: "#34495e",
    fontSize: "1rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.8rem 0",
    transition: "all 0.3s ease",
    position: "relative",
    "&:hover": {
      color: "#3498db",
      "&::after": {
        width: "100%",
      }
    },
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "0",
      height: "2px",
      backgroundColor: "#3498db",
      transition: "width 0.3s ease",
    }
  },
  linkIcon: {
    fontSize: "1.2rem",
  },
  dropdown: {
    position: "relative",
    "&:hover ul": {
      display: "block",
    }
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    right: "0",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    minWidth: "200px",
    padding: "0.5rem 0",
    display: "none",
    zIndex: 1000,
  },
  dropdownItem: {
    padding: "0.5rem 1rem",
    "&:hover": {
      backgroundColor: "#f8f9fa",
    }
  },
  dropdownLink: {
    textDecoration: "none",
    color: "#2c3e50",
    fontSize: "0.9rem",
    display: "block",
    width: "100%",
    "&:hover": {
      color: "#3498db",
    }
  },
  logoutButton: {
    background: "none",
    border: "none",
    color: "#e74c3c",
    fontSize: "0.9rem",
    fontWeight: "500",
    cursor: "pointer",
    padding: "0",
    width: "100%",
    textAlign: "left",
    "&:hover": {
      color: "#c0392b",
    }
  }
};

export default Navbar;