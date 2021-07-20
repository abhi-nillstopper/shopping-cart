import express from "express";
import { verifyToken } from "./middleware/verifyToken";
import UserController from "./controllers/user_controller";
import BannerController from "./controllers/banner_controller";
import CategoryController from "./controllers/category_controller";
import ProductController from "./controllers/product_controller";
import CartController from "./controllers/cart_controller";

const app_routes = express.Router();

app_routes.get("/status", (req, res) => {
  res.status(200).send({ status: 200 });
});

//user
app_routes.post("/api/user/authenticate", UserController.authenticateUser);
app_routes.post("/api/user/register", UserController.CreateUser);

//banners
app_routes.get("/api/banners", verifyToken, BannerController.getAllBanner);

//Category
app_routes.get("/api/categories", verifyToken, CategoryController.getAllCategories);

//Product
app_routes.get("/api/products", verifyToken, ProductController.getAllProducts);

//Cart
app_routes.post("/api/cart", verifyToken, CartController.addToCart);
app_routes.get("/api/cart", verifyToken, CartController.getCartProducts);

export default app_routes;
