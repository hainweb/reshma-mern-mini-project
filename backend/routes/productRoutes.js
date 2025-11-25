const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { auth, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); // your multer setup

// 👉 Add product (admin only)
router.post("/add", auth, admin, upload.single("image"), async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const image = req.file.path;
    const product = new Product({ name, price, category, image });
    await product.save();
    res.json({ message: "Product added", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// 👉 Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 👉 Update product (admin only)
router.put("/:id", auth, admin, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 👉 Delete product (admin only)
router.delete("/:id", auth, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
