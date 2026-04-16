import React, { useState } from "react";
import axios from "axios";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [offered, setOffered] = useState("");
  const [wanted, setWanted] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setMessage("");

    if (!offered && !wanted) {
      return setMessage("❌ Please enter at least one skill");
    }

    try {
      setLoading(true);

      await axios.put("http://localhost:5000/api/user/skills", {
        skillsOffered: offered.split(",").map(s => s.trim()),
        skillsWanted: wanted.split(",").map(s => s.trim()),
        userId: user.id
      });

      setMessage("✅ Skills updated successfully!");

    } catch (err) {
      console.error(err);
      setMessage("❌ Error updating skills");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* USER INFO */}
        <h2 style={styles.title}>👤 {user?.name}</h2>
        <p style={styles.email}>{user?.email}</p>

        {/* INPUTS */}
        <div style={styles.section}>
          <label>Skills You Offer</label>
          <input
            placeholder="e.g. React, Java, Photoshop"
            style={styles.input}
            onChange={(e) => setOffered(e.target.value)}
          />
        </div>

        <div style={styles.section}>
          <label>Skills You Want</label>
          <input
            placeholder="e.g. AI, Python, UI Design"
            style={styles.input}
            onChange={(e) => setWanted(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          style={styles.button}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Skills →"}
        </button>

        {/* MESSAGE */}
        {message && <p style={styles.message}>{message}</p>}

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #0f172a, #020617)",
    color: "white",
  },

  card: {
    width: "400px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 0 40px rgba(233,69,96,0.2)",
  },

  title: {
    marginBottom: "5px",
    color: "#e94560",
  },

  email: {
    marginBottom: "20px",
    color: "#ccc",
    fontSize: "14px",
  },

  section: {
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    marginTop: "5px",
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#e94560,#ff2e63)",
    color: "white",
    cursor: "pointer",
  },

  message: {
    marginTop: "15px",
    fontSize: "14px",
  },
};

export default Profile;