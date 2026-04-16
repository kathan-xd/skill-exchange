import React, { useEffect, useState } from "react";
import axios from "axios";

function Browse() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/browse");
      console.log(res.data); // 🔥 DEBUG
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Explore Skills</h1>

      <div style={styles.grid}>
        {users.map((u, i) => (
          <div key={i} style={styles.card}>
            <h3>{u.name}</h3>

            <p>
              <strong>Offers:</strong>{" "}
              {u.skillsOffered && u.skillsOffered.length > 0
                ? u.skillsOffered.join(", ")
                : "None"}
            </p>

            <p>
              <strong>Wants:</strong>{" "}
              {u.skillsWanted && u.skillsWanted.length > 0
                ? u.skillsWanted.join(", ")
                : "None"}
            </p>

            <button style={styles.btn}>Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #020617, #0f172a)",
    color: "white",
  },

  title: {
    marginBottom: "30px",
    fontSize: "32px",
    color: "#e94560",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
    gap: "20px",
  },

  card: {
    padding: "20px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 0 20px rgba(233,69,96,0.2)",
  },

  btn: {
    marginTop: "10px",
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    background: "#e94560",
    color: "white",
    cursor: "pointer",
  },
};

export default Browse;