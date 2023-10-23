const express = require("express");
const userRoutes = require("../routes/userRoutes");
const productRoutes = require("../routes/productRoutes");
const cartRoutes = require("../routes/cartRoutes");
const cors = require("cors");


function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use("/api/auth", userRoutes);
  app.use("/api/shop", productRoutes);
  app.use("/api/cart", cartRoutes);


  return app;
}

module.exports = createServer