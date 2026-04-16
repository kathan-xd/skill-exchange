import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>SkillExchange</Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/browse" style={styles.link}>Browse</Link>

        {user ? (
          <>
            <Link to="/profile" style={styles.link}>Profile</Link>

            {user.role === 'admin' && (
              <Link to="/admin" style={styles.link}>Admin</Link>
            )}

            <span style={styles.username}>Hi, {user.name}</span>

            <button onClick={toggleTheme} style={styles.iconBtn}>
              🌗
            </button>

            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.primaryBtn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 50px",
    height: "70px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },

  logo: {
    color: "#e94560",
    fontSize: "26px",
    fontWeight: "bold",
    textDecoration: "none",
    letterSpacing: "1px",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "22px",
  },

  link: {
    color: "#ccc",
    textDecoration: "none",
    fontSize: "15px",
    transition: "0.3s",
  },

  username: {
    color: "#e94560",
    fontSize: "14px",
  },

  primaryBtn: {
    background: "linear-gradient(90deg,#e94560,#ff2e63)",
    color: "white",
    padding: "8px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    transition: "0.3s",
  },

  logout: {
    background: "#e94560",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  iconBtn: {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    padding: "8px",
    borderRadius: "50%",
    cursor: "pointer",
    color: "white",
    fontSize: "16px",
  },
};

export default Navbar;