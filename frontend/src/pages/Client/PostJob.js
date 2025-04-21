import React, { useState } from "react";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Get clientId from localStorage (saved during login)
    const clientId = localStorage.getItem("userId");
    console.log(clientId);
  
    // Merge jobData with clientId
    const payload = {
      ...jobData,
      clientId, // This links the job to the client in MongoDB
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Job posted successfully!");
        setJobData({
          title: "",
          description: "",
          budget: "",
          deadline: "",
          category: "",
        });
      } else {
        alert(data.message || "Failed to post job.");
      }
    } catch (err) {
      alert("Server error. Try again later.");
    }
  };
  

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Post a New Job</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobData.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={jobData.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        ></textarea>
        <input
          type="number"
          name="budget"
          placeholder="Budget ($)"
          value={jobData.budget}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="date"
          name="deadline"
          value={jobData.deadline}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select
          name="category"
          value={jobData.category}
          onChange={handleChange}
          required
          style={styles.select}
        >
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Writing">Writing</option>
          <option value="Marketing">Marketing</option>
        </select>
        <button type="submit" style={styles.button}>Post Job</button>
      </form>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    height: "100px",
    resize: "none",
  },
  select: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default PostJob;
