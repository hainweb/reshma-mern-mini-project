const jwt = require("jsonwebtoken");
const User = require("../models/User");

// --- Authenticate User ---
exports.auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: user._id, role: 'admin' }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user.role = user.role;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

// --- Admin Check ---
exports.admin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only route" });
  next();
};
