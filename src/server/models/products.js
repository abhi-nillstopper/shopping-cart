import mongoose from "mongoose";

export const ProductsSchema = mongoose.Schema({
  name: String,
  imageURL: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  sku: String,
  id: String,
});

const Products = mongoose.model("Products", ProductsSchema);

export default Products;
