import React, { useState } from "react";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/api/gemini/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Give helpful job insights for: ${query}`,
        }),
      });

      const data = await res.json();
      setResponse(data.response || "No response.");
    } catch (error) {
      console.error("Client Error:", error);
      setResponse("Error fetching response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatbox}>
        <h2 style={styles.heading}>Job Assistant Chatbot</h2>
        <textarea
          placeholder="Enter job keywords (e.g., React, full stack, remote)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.textarea}
        />
        <button
          onClick={handleAsk}
          style={{
            ...styles.button,
            ...(loading && styles.disabledButton),
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Ask"}
        </button>
        {response && <div style={styles.response}>{response}</div>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 16px",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh",
  },
  chatbox: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    marginBottom: "16px",
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: "20px",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    minHeight: "90px",
    marginBottom: "12px",
    fontFamily: "inherit",
    resize: "vertical",
    outlineColor: "#007BFF",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  disabledButton: {
    backgroundColor: "#8bb8ff",
    cursor: "not-allowed",
  },
  response: {
    marginTop: "20px",
    backgroundColor: "#f5faff",
    padding: "16px",
    borderRadius: "1px",
    border: "1px solid #cce4ff",
    whiteSpace: "pre-wrap",
    color: "#333",
    lineHeight: "1.5",
  },
};

export default Chatbot;
