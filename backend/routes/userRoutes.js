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

// User login
router.post('/login', async (req, res) => {
  try {
    const { name } = req.body; // You can change this to phone/email if you add it to the model
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Record login time (start a new session)
    user.sessions.push({ login: new Date() });
    await user.save();
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User logout (update last session's logout time and duration)
router.post('/logout', async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Find the last session (assume it's the current one)
    const lastSession = user.sessions[user.sessions.length - 1];
    if (!lastSession || lastSession.logout) {
      return res.status(400).json({ error: 'No active session to logout' });
    }
    lastSession.logout = new Date();
    lastSession.duration = (new Date(lastSession.logout) - new Date(lastSession.login)) / 1000;
    await user.save();
    res.status(200).json({ message: 'Logout successful', sessions: user.sessions });
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