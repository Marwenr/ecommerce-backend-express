const express = require("express");
const userRoutes = require("../routes/userRoutes");
const cors = require("cors");


function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use("/api/auth", userRoutes);


  return app;
}

module.exports = createServer