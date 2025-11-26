const express = require("express");
const router = express.Router();

// Dummy login for admin
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "1234") {
    // Return token and admin info
    return res.json({ token: "fake-jwt-token", admin: { email } });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
