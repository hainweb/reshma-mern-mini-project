const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes); // 🔹 this line must exist
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => res.send("API Running"));

// app.post("/api/auth/admin/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ message: "Admin not found" });

//     if (user.role !== "admin")
//       return res.status(403).json({ message: "Not an admin" });

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: "admin" },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ message: "Admin login success", token });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });
app.use("/api/cart", cartRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
