const mongoose = require("mongoose");
const category = require("./category");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  productName: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);
