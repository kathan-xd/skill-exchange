const express = require('express');
const router = express.Router();

console.log("🔥 USER ROUTES LOADED");

const User = require('../models/User');


// ✅ UPDATE SKILLS
router.put('/skills', async (req, res) => {
  try {
    const { skillsOffered, skillsWanted, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.skillsOffered = skillsOffered || [];
    user.skillsWanted = skillsWanted || [];

    await user.save();

    res.json({ message: "Skills updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ GET USERS
router.get('/browse', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// 🚨 FORCE DELETE TEST ROUTE
router.delete('/:id', async (req, res) => {
  try {
    console.log("🔥 DELETE ROUTE HIT:", req.params.id);

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;