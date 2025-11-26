const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { auth, admin } = require("../middleware/authMiddleware");
const path = require("path");
const multer = require("multer");

/* ---------------------- MULTER STORAGE ---------------------- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder must exist
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ---------------------- CREATE PRODUCT (ADMIN) ---------------------- */
router.post("/", auth, admin, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------- UPDATE PRODUCT (ADMIN) ---------------------- */
router.put("/:id", auth, admin, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const update = { name, description, price, category };

    if (req.file) {
      update.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------- DELETE PRODUCT (ADMIN) ---------------------- */
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------- GET SINGLE PRODUCT ---------------------- */
router.get("/:id", async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    res.json(prod);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------- LIST PRODUCTS (SEARCH, SORT, PAGINATION) ---------------------- */
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 6, search = "", category, sort } = req.query;

    const query = {};

    if (search) query.name = { $regex: search, $options: "i" };
    if (category) query.category = category;

    let cursor = Product.find(query);

    // Sorting
    if (sort === "price_asc") cursor = cursor.sort({ price: 1 });
    if (sort === "price_desc") cursor = cursor.sort({ price: -1 });

    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(query);
    const items = await cursor.skip(skip).limit(Number(limit));

    res.json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
