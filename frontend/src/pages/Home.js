import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const styles = {
    homeContainer: {
      fontFamily: "'Poppins', sans-serif",
      color: "#333",
      textAlign: "center",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    },
    section: {
      width: "90%",
      maxWidth: "700px",
      padding: "40px",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      marginBottom: "30px",
    },
    heading: {
      fontSize: "2.8rem",
      fontWeight: "bold",
      color: "#222",
      marginBottom: "10px",
    },
    subHeading: {
      fontSize: "1.2rem",
      color: "#666",
      marginBottom: "25px",
    },
    ctaButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "10px",
    },
    button: {
      padding: "12px 24px",
      fontSize: "1rem",
      fontWeight: "600",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "0.3s",
      border: "none",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    loginBtn: { backgroundColor: "#007bff", color: "white" },
    signupBtn: { backgroundColor: "#28a745", color: "white" },
    sectionTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
      margin: "40px 0 20px",
      color: "#222",
    },
    featureSection: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px",
      padding: "30px",
      width: "90%",
      maxWidth: "1000px",
    },
    featureItem: {
      padding: "20px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
      textAlign: "center",
      minHeight: "130px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    stepSection: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      marginTop: "20px",
      width: "90%",
      maxWidth: "900px",
    },
    stepBox: {
      padding: "20px",
      background: "#f1f1f1",
      borderRadius: "10px",
      textAlign: "center",
      minHeight: "130px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    footer: {
      marginTop: "40px",
      fontSize: "0.9rem",
      color: "#555",
    },
  };

  return (
    <div style={styles.homeContainer}>
      {/* Hero Section */}
      <section style={styles.section}>
        <h1 style={styles.heading}>Welcome to FreelanceHub</h1>
        <p style={styles.subHeading}>
          Find top freelancers or get hired for amazing projects. Start your journey today!
        </p>
        <div style={styles.ctaButtons}>
          <button
            onClick={() => navigate("/login")}
            style={{ ...styles.button, ...styles.loginBtn }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            style={{ ...styles.button, ...styles.signupBtn }}
          >
            Sign Up
          </button>
        </div>
      </section>

      {/* Features Section */}
      <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
      <section style={styles.featureSection}>
        <div style={styles.featureItem}>
          <h3>✅ Secure Payments</h3>
          <p>Fast & safe transactions.</p>
        </div>
        <div style={styles.featureItem}>
          <h3>🌍 Global Talent</h3>
          <p>Work with professionals worldwide.</p>
        </div>
        <div style={styles.featureItem}>
          <h3>💼 Job Opportunities</h3>
          <p>Endless projects for every skill.</p>
        </div>
      </section>

      {/* How It Works Section */}
      <h2 style={styles.sectionTitle}>How It Works</h2>
      <section style={styles.stepSection}>
        <div style={styles.stepBox}>
          <h4>1️⃣ Sign Up</h4>
          <p>Create an account as a client or freelancer.</p>
        </div>
        <div style={styles.stepBox}>
          <h4>2️⃣ Post or Apply</h4>
          <p>Clients post jobs, freelancers submit proposals.</p>
        </div>
        <div style={styles.stepBox}>
          <h4>3️⃣ Work & Earn</h4>
          <p>Start working, complete tasks, and get paid securely.</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 FreelanceHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
