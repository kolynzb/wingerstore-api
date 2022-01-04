const db = require("../db");
const route = require("express").Router();
const {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
} = require("../Controllers/productController");

route.get("/", getAllProducts);
route.post("/", createProduct);
route.get("/:id", getProduct);
route.put("/:id", updateProduct);
route.delete("/:id", deleteProduct);

module.exports = route;
