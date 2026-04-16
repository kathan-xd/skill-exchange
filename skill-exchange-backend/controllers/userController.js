const User = require('../models/User');

// UPDATE SKILLS
exports.updateSkills = async (req, res) => {
  try {
    const { skillsOffered, skillsWanted, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.skillsOffered = skillsOffered || [];
    user.skillsWanted = skillsWanted || [];

    await user.save();

    res.json({ message: "Skills updated successfully", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔥 DELETE USER (FIXED OUTSIDE)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

console.log("DELETE HIT:", req.params.id);
    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};