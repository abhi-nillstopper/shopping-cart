import express from "express";
import { verifyToken } from "./middleware/verifyToken";
import UserController from "./controllers/user_controller";
import BannerController from "./controllers/banner_controller";
import CategoryController from "./controllers/category_controller";
import ProductController from "./controllers/product_controller";

const route = express.Router();

route.get("/status", (req, res) => {
  res.status(200).send({ status: 200 });
});

//user
route.post("/user/authenticate", UserController.authenticateUser);
route.post("/user/register", UserController.CreateUser);

//banners
route.get("/banners", verifyToken, BannerController.getAllBanner);

//Category
route.get("/categories", verifyToken, CategoryController.getAllCategories);

//Product
route.get("/products", verifyToken, ProductController.getAllProducts);

export default route;
