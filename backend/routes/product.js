const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// PUBLIC — everyone can access
router.get("/", getAllProducts);
router.get("/:id", getProduct);

// NO LOGIN REQUIRED
router.post("/", upload.single("image"), addProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
