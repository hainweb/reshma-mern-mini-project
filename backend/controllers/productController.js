const Product = require("../models/product");

// ADD Product
description
// GET All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// FIXED — GET product by ID
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE Product
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category ,description } = req.body;

    // Data to update
    let updateData = {
      name,
      price,
      category,
      description,
    };

    // If new image uploaded
    if (req.file) {
      updateData.image = req.file.filename; // or req.file.path
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Update failed" });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};