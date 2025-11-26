const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Seed route (one-time) - create admin (call manually if needed)
router.post('/seed', async (req, res) => {
const { name, email, password } = req.body;
const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: 'Already exists' });
const hashed = await bcrypt.hash(password, 10);
const user = new User({ name, email, password: hashed, role: 'admin' });
await user.save();
res.json({ message: 'Admin created' });
});


// Login
router.post('/login', async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid creds' });
const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(400).json({ message: 'Invalid creds' });
const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token });
});


module.exports = router;