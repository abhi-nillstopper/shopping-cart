import * as React from "react";
import { Image, Button, Alert } from "react-bootstrap";
import { UserContext } from "../../user-context";
import "./card.scss";

interface CardProps {
  product: { [key: string]: any };
}

const Card: React.FC<CardProps> = (props): React.ReactElement => {
  const { imageURL, description, price, name, id } = props.product;

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertVariant, setAlertVariant] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  const { numOfItems, setNumOfItems, cartItems, setCartItems } =
    React.useContext(UserContext);

  const handleBuy = () => {
    let user_cart_items: any[] = JSON.parse(
      localStorage.getItem("user_cart_items")
    );

    const isItemPresent =
      user_cart_items.filter((obj: any) => obj.id === id).length > 0
        ? true
        : false;

    if (!isItemPresent) {
      let numOfItemsInt = parseInt(numOfItems) + 1;
      let updatedCart = [
        ...cartItems,
        { name, imageURL, price, id, quantity: 1 },
      ];
      localStorage.setItem("numOfProductsInCart", numOfItemsInt.toString());
      localStorage.setItem("user_cart_items", JSON.stringify(updatedCart));
      setNumOfItems(parseInt(numOfItems) + 1);
      setCartItems(updatedCart);

      setAlertVariant("success");
      setAlertMessage("Item added in cart successfully");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1500);
    } else {
      // let numOfItemsInt = parseInt(numOfItems) + 1;

      user_cart_items.some((product) => {
        if (product.id === id) {
          if (product.quantity === 5) {
            setAlertVariant("danger");
            setShowAlert(true);
            setAlertMessage("Max 5 quantity allowed per Product");
            setTimeout(() => setShowAlert(false), 1500);
          } else {
            product.quantity = parseInt(product.quantity) + 1;
            localStorage.setItem(
              "user_cart_items",
              JSON.stringify(user_cart_items)
            );
            setCartItems(user_cart_items);

            setAlertVariant("success");
            setAlertMessage("Item added in cart successfully");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 1500);
          }
          return true;
        }
        return false;
      });
      // let updatedCart = [...cartItems, { name, imageURL, price, id, quantity: 1 }];
      // localStorage.setItem("numOfProductsInCart", numOfItemsInt.toString());
      // setNumOfItems(parseInt(numOfItems) + 1);
      // setAlertVariant("danger");
      // setShowAlert(true);
      // setAlertMessage("Goto cart, Product already in cart");
      // setTimeout(() => setShowAlert(false), 1500);
    }
  };

  return (
    <>
      <div className="card-container">
        <h6>{name}</h6>
        <div className="product-image-description">
          <Image alt={name} src={imageURL} />
          <div className="card-description">
            <div> {description}</div>
            <Button
              className="small-screen-btn"
              variant="danger"
              onClick={handleBuy}
              name="Buy Now"
            >
              Buy Now @ <span>MRP Rs. {price}</span>
            </Button>
          </div>
        </div>
        <div className="card-bottom">
          <span>MRP Rs. {price}</span>
          <Button variant="danger" onClick={handleBuy}>
            Buy Now
          </Button>
        </div>
      </div>
      {showAlert && (
        <div className="alert-container">
          <Alert variant={alertVariant}>
            <p>{alertMessage}</p>
          </Alert>
        </div>
      )}
    </>
  );
};

export default Card;
