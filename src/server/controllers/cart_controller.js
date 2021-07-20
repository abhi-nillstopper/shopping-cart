import Cart from "../models/cart";
import CartHelper from "../middleware/cart_middleware";
const CartController = {
  async addToCart(req, res) {
    try {
      const {
        authData: {
          user: { _id: user_id },
        },
      } = res.locals;

      const { productsInCart } = req.body;

      const user_cart = await Cart.findOne({
        user: user_id,
      });
      if (!user_cart) {
        const user_cart_new = await Cart.create({
          productsInCart,
          user: user_id,
        });

        return res.status(200).json({ message: "Products added in cart" });
      } else {
        const updated_user_cart = await Cart.updateOne(
          { user: user_id },
          {
            $set: {
              productsInCart: productsInCart,
            },
          }
        );
        return res.status(200).json({ message: "Products added in cart" });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(400).json({ message: "Error while updating cart" });
    }
  },

  async getCartProducts(req, res) {
    try {
      const {
        authData: {
          user: { _id: user_id },
        },
      } = res.locals;

      let user_cart = await Cart.findOne({
        user: user_id,
      });

      if (!user_cart) {
        const user_cart_new = await Cart.create({
          productsInCart: [],
          user: user_id,
        });

        return res.status(200).json(user_cart_new);
      } else {
        // populate({
        //   path: "productsInCart",
        //   // model: 'Post',
        //   populate: {
        //     path: "product_id",
        //     // model: 'Comment'
        //   },
        // });
        await user_cart
          .populate({
            path: "productsInCart",
            // model: 'Post',
            populate: {
              path: "product_id",
              // model: 'Comment'
            },
          })
          .execPopulate();

        user_cart = await CartHelper.generateResponse(user_cart);

        return res.status(200).json(user_cart);
      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(400)
        .json({ message: "Error while getting products in cart" });
    }
  },
};

export default CartController;
