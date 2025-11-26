const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true ,default: "Admin"},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "adin",enum: ['admin','user'] }, 
});

module.exports = mongoose.model("User", userSchema);
