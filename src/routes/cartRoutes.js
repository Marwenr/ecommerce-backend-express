const express = require("express");
const route = express.Router();
const cartController = require("../controllers/cart");
const { protect, allowedTo } = require("../middlewares/autorisation");
const validateCart = require("../middlewares/validationCart");

route.get(
  "/all",
  protect,
  allowedTo("admin", "manager"),
  cartController.getAllCarts
);
route.get(
  "/:id",
  protect,
  allowedTo("admin", "manager"),
  cartController.getCart
);
route.get(
  "/",
  protect,
  allowedTo("admin", "manager"),
  cartController.getCartByDate
);
route.delete(
  "/:id",
  protect,
  allowedTo("admin", "manager"),
  cartController.deleteCart
);
route.post(
  "/create",
  protect,
  allowedTo("admin", "manager"),
  validateCart,
  cartController.createCart
);
route.put(
  "/:id",
  protect,
  allowedTo("admin", "manager"),
  validateCart,
  cartController.updateCart
);

module.exports = route;
