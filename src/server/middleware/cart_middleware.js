const CartHelper = {
  generateResponse(payload) {
    return new Promise((resolve, reject) => {
      console.log("payload", JSON.stringify(payload));
      payload = payload.productsInCart.map((item) => {
        return {
          name: item.product_id.name,
          imageURL: item.product_id.imageURL,
          price: item.product_id.price,
          id: item.product_id.id,
          quantity: item.quantity,
        };
      });
      resolve(payload);
    });
  },
};

export default CartHelper;
