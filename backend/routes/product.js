const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  addProduct, getAllProducts, getProduct, updateProduct, deleteProduct
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", auth, upload.single("image"), addProduct);
router.put("/:id", auth, upload.single("image"), updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
