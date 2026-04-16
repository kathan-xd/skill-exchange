import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return setError("All fields are required");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.post("https://skill-exchange-production-c9dc.up.railway.app/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setSuccess("✅ Account created! Now login.");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });

    } catch (err) {
      setError(err.response?.data?.message || "User already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <input
          placeholder="Name"
          value={form.name}
          style={styles.input}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          style={styles.input}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          style={styles.input}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type={show ? "text" : "password"}
          placeholder="Confirm Password"
          value={form.confirmPassword}
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <button onClick={() => setShow(!show)} style={styles.showBtn}>
          {show ? "Hide Password" : "Show Password"}
        </button>

        <button style={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Register →"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #0f172a, #020617)",
  },

  card: {
    backdropFilter: "blur(25px)",
    background: "rgba(255,255,255,0.05)",
    padding: "50px",
    borderRadius: "20px",
    width: "350px",
    boxShadow: "0 0 40px rgba(233,69,96,0.2)",
  },

  title: {
    color: "#e94560",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg,#e94560,#ff2e63)",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
  },

  showBtn: {
    marginBottom: "10px",
    background: "transparent",
    color: "#ccc",
    border: "none",
    cursor: "pointer",
  },

  error: {
    color: "red",
    fontSize: "14px",
  },

  success: {
    color: "lightgreen",
    fontSize: "14px",
  },
};

export default Register;