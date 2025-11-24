const express = require("express");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const upload = require("../middleware/upload");
const router = express.Router();

router.post("/add", upload.single("image"), addProduct);
router.get("/", getProducts);
router.put("/update/:id", upload.single("image"), updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
