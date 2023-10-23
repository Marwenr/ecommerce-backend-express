const express = require("express");
const route = express.Router();
const productController = require("../controllers/product");
const { protect, allowedTo } = require("../middlewares/autorisation");
const validateCategory = require("../middlewares/validationCategory");
const validateProduct = require("../middlewares/validationProduct");

route.get("/categories", productController.getAllCategories);
route.get("/products", productController.getAllProducts);
route.get("/category/:id", productController.getProductsSpecificCategory);
route.get("/product/:id", productController.getProduct);
route.delete(
  "/product/:id",
  protect,
  allowedTo("admin", "manager"),
  productController.deleteProduct
);
route.delete(
  "/category/:id",
  protect,
  allowedTo("admin", "manager"),
  productController.deleteCategory
);
route.post(
  "/product/create",
  validateProduct,
  protect,
  allowedTo("admin", "manager"),
  productController.createProduct
);
route.post(
  "/category/create",
  validateCategory,
  protect,
  allowedTo("admin", "manager"),
  productController.createCategory
);
route.put(
  "/product/:id",
  validateProduct,
  protect,
  allowedTo("admin", "manager"),
  productController.updateProduct
);

module.exports = route;
