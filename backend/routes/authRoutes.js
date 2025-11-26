const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const jwt = require("jsonwebtoken");

// register first admin
router.post("/register", register);
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ admin, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
