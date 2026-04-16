import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!form.email || !form.password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://skill-exchange-production-c9dc.up.railway.app/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/profile";

    } catch (err) {
      setError(err.response?.data?.message || "Invalid login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          placeholder="Email"
          value={form.email}
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={() => setShow(!show)} style={styles.showBtn}>
          {show ? "Hide Password" : "Show Password"}
        </button>

        <button style={styles.button} onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login →"}
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
    boxShadow: "0 0 40px rgba(233,69,96,0.3)",
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
    marginTop: "10px",
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
    marginBottom: "10px",
  },
};

export default Login;