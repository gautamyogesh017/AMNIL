const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: String, required: true },
    product_type: { type: String, required: true },
  },
  {
    timestamps: true,
  },
  {
    collection: "ProductLists",
  }
);
const productModel = mongoose.model("Products", productSchema);
module.exports = productModel;
