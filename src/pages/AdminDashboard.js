import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  // DELETE USER
  const handleDelete = async (id) => {
  console.log("Deleting ID:", id);

  try {
    const res = await axios.delete(
      `http://127.0.0.1:5000/api/user/${id}`
    );

    console.log("RESPONSE:", res.data);

    setUsers(prev => prev.filter(user => user._id !== id));

    alert("User deleted successfully");

  } catch (err) {
    console.log("FULL ERROR:", err.response || err);
    alert("Error deleting user");
  }
};

  // FETCH USERS
  useEffect(() => {
    axios
      .get("https://skill-exchange-production-c9dc.up.railway.app/api/user/browse")
      .then((res) => setUsers(res.data))
      .catch(() => alert("Error fetching users"));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚡ Admin Control Panel</h1>

      <div style={styles.grid}>
        {users.map((u, i) => (
          <motion.div
            key={u._id}
            style={styles.card}
            whileHover={{ scale: 1.08, rotateY: 8 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {/* USER INFO */}
            <h3>{u.name}</h3>
            <p style={styles.email}>{u.email}</p>

            {/* SKILLS OFFERED */}
            <div style={styles.section}>
              <strong>Offers:</strong>
              <p>{u.skillsOffered?.join(", ") || "None"}</p>
            </div>

            {/* SKILLS WANTED */}
            <div style={styles.section}>
              <strong>Wants:</strong>
              <p>{u.skillsWanted?.join(", ") || "None"}</p>
            </div>

            {/* DELETE BUTTON (FIXED HERE) */}
            <button
              style={styles.deleteBtn}
              onClick={() => handleDelete(u._id)}
            >
              🗑 Remove User
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg,#020617,#0f172a)",
    color: "white",
  },

  title: {
    marginBottom: "30px",
    fontSize: "36px",
    background: "linear-gradient(90deg,#ff2e63,#e94560)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))",
    gap: "25px",
  },

  card: {
    padding: "25px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 0 25px rgba(255,0,100,0.15)",
    transition: "0.3s",
  },

  email: {
    color: "#aaa",
    fontSize: "13px",
    marginBottom: "10px",
  },

  section: {
    marginTop: "10px",
  },

  deleteBtn: {
    marginTop: "20px",
    padding: "10px",
    width: "100%",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#ff2e63,#e94560)",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 0 12px #ff2e63",
    transition: "0.3s",
  },
};

export default AdminDashboard;