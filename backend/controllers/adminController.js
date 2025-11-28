const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // <- expects these fields

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, role: "admin", email: admin.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Check duplicate email
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already exists. Please login instead." 
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const admin = new Admin({ email, password: hashed });
    await admin.save();

    res.json({
      success: true,
      message: "Admin registered successfully",
      email: admin.email
    });
 } catch (error) {
  console.error("REGISTER ERROR:", error);  
  res.status(500).json({ success: false, message: error.message });
}
};
