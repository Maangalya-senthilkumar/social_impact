const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Add a new user
router.post('/add', async (req, res) => {
  try {
    const { name, role } = req.body;
    const user = new User({ name, role });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Log a session for a user (student or parent)
router.post('/log-session', async (req, res) => {
  try {
    const { userId, login, logout } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.role === 'student' || user.role === 'parent') {
      const duration = (new Date(logout) - new Date(login)) / 1000; // seconds
      user.sessions.push({ login, logout, duration });
      await user.save();
      return res.status(200).json({ message: 'Session logged', sessions: user.sessions });
    } else {
      return res.status(400).json({ error: 'Session tracking not allowed for this role' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark attendance for a user (student or parent)
router.post('/mark-attendance', async (req, res) => {
  try {
    const { userId, date } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!user.attendance) user.attendance = [];
    user.attendance.push({ date: date || new Date() });
    await user.save();
    return res.status(200).json({ message: 'Attendance marked', attendance: user.attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;