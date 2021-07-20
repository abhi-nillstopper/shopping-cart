import mongoose from "mongoose";
import { ProductsSchema } from "./products";

const CartSchema = mongoose.Schema({
  //   productsInCart: [
  //     {
  //       _id: {
  //         type: mongoose.Types.ObjectId,
  //         ref: "Products",
  //       },
  //       id: String,
  //       name: String,
  //       imageURL: String,
  //       price: Number,
  //       quantity: Number,
  //     },
  //   ],
  productsInCart: [
    {
      product_id: {
        type: mongoose.Types.ObjectId,
        ref: "Products",
      },
      quantity: Number,
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
