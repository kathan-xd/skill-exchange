console.log("🚀 SERVER FILE RUNNING");
const userRoutes = require('./routes/userRoutes');
console.log("✅ userRoutes imported");
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// MIDDLEWARE FIRST
app.use(cors());
app.use(express.json());

// ROUTES AFTER
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('API Running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});