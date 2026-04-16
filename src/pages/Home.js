import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      
      {/* HERO SECTION */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Learn. Teach. <span style={styles.highlight}>Connect.</span>
        </h1>

        <p style={styles.subtitle}>
          Exchange skills with people around the world — no money, just knowledge.
        </p>

        <div style={styles.btnGroup}>
          <button style={styles.primaryBtn} onClick={() => navigate("/browse")}>
            Explore Skills →
          </button>

          <button style={styles.secondaryBtn} onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div style={styles.features}>
        <div style={styles.card}>
          <h3>🎯 Learn Anything</h3>
          <p>Find people who can teach you new skills instantly.</p>
        </div>

        <div style={styles.card}>
          <h3>🤝 Teach & Share</h3>
          <p>Help others by sharing your knowledge and expertise.</p>
        </div>

        <div style={styles.card}>
          <h3>🌍 Global Network</h3>
          <p>Connect with learners and experts worldwide.</p>
        </div>
      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "radial-gradient(circle at top, #0f172a, #020617)",
    color: "white",
  },

  hero: {
    textAlign: "center",
    marginTop: "100px",
  },

  title: {
    fontSize: "60px",
    fontWeight: "bold",
  },

  highlight: {
    background: "linear-gradient(90deg,#e94560,#ff2e63)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },

  subtitle: {
    marginTop: "15px",
    color: "#ccc",
    fontSize: "18px",
  },

  btnGroup: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },

  primaryBtn: {
    padding: "12px 24px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#e94560,#ff2e63)",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
  },

  secondaryBtn: {
    padding: "12px 24px",
    borderRadius: "10px",
    border: "1px solid #e94560",
    background: "transparent",
    color: "#e94560",
    cursor: "pointer",
  },

  features: {
    marginTop: "100px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
    gap: "30px",
  },

  card: {
    padding: "25px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(15px)",
    textAlign: "center",
    transition: "0.3s",
  },
};

export default Home;