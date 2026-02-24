const express = require("express");
const productController = require("../controllers/product");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// router.post("/create", productController.createProduct);

router.put("/update/:id", productController.updateProduct);

router.delete(
  "/delete/:id",
  /*authMiddleware,*/ productController.deleteProduct
);

router.get("/:id", productController.getProduct);

router.get("/", productController.getProducts);

// Resim yükleme ve ürün oluşturma rotası
router.post(
  "/create",
  upload.single("image"), // Tek bir resim dosyası bekleniyor
  productController.createProduct
);

router.post("/rate/:id", productController.rateProduct);

module.exports = router;
