const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    sizes: {
      type: Array,
    },
    colors: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    categories: {
      type: Array,
    },
    img: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
