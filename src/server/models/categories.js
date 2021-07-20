import mongoose from "mongoose";

const CategoriesSchema = mongoose.Schema({
  name: String,
  key: String,
  description: String,
  enabled: Boolean,
  order: Number,
  imageUrl: String,
});

const Categories = mongoose.model("Categories", CategoriesSchema);
export default Categories;
