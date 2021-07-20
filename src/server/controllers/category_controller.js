import Categories from "../models/categories";

const CategoryController = {
  async getAllCategories(req, res) {
    try {
      const { authData } = res.locals;
      const categories = await Categories.find({});
      if (categories.length > 0) {
        return res.status(200).json({ authData, categories });
      }
      return res.status(400).json({ message: "No Categories found" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error while getting categories" });
    }
  },
};

export default CategoryController;
