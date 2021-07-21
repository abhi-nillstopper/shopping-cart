import React, { useEffect, useState, useContext, reactc, useMemo } from "react";
import { Modal, Button, Image, Alert } from "react-bootstrap";
import { UserContext } from "../../user-context";
import DeleteIcon from "../../svgs/delete_fill.svg";
import "./modal.scss";

export default function ModalComponent(props) {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const { cartItems, numOfItems, setCartItems, setNumOfItems } =
    useContext(UserContext);

  const reduceFunc = (sum, item) => {
    return sum + item.price * item.quantity;
  };

  // let user_cart_items = JSON.parse(localStorage.getItem("user_cart_items"));

  useEffect(() => {
    let user_cart_items = JSON.parse(localStorage.getItem("user_cart_items"));
    setFinalAmount(user_cart_items.reduce(reduceFunc, 0));
  }, [cartItems]);

  useEffect(() => {
    setShow(props.visible);
  });

  const handleClose = () => {
    setShow(false);
    props.toggleModal();
  };

  const calcFinalAmount = (newAmount, op = "+") => {
    if (op === "+") {
      setFinalAmount(finalAmount + newAmount);
    } else {
      setFinalAmount(finalAmount - newAmount);
    }
  };

  const handleDelete = (id) => {
    const newCartItems = cartItems.filter((obj) => obj.id !== id) || [];
    setCartItems(newCartItems);
    setNumOfItems(newCartItems.length);
    localStorage.setItem("user_cart_items", JSON.stringify(newCartItems));
    localStorage.setItem("numOfProductsInCart", newCartItems.length);
  };

  const handleCheckout = () => {
    setShowAlert(true);
    setCartItems([]);
    setNumOfItems(0);
    localStorage.setItem("user_cart_items", "[]");
    localStorage.setItem("numOfProductsInCart", "0");
    setTimeout(() => {
      setShowAlert(false);
      handleClose();
    }, 1500);
  };

  return (
    <>
      <Modal
        className="user-cart-modlal"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>My Cart ({numOfItems} items)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cart-items">
            {cartItems.map((item, index) => {
              return (
                <div className="induvidual-item" key={index}>
                  <Image
                    alt={item.name}
                    className="item-img"
                    src={item.imageURL}
                  />
                  <div className="product-info">
                    <div>
                      <h6 title={item.name}>{item.name}</h6>
                    </div>
                    <CartFunctions
                      calcFinalAmount={calcFinalAmount}
                      price={item.price}
                      name={item.name}
                      product_id={item.id}
                      quantity={item.quantity}
                      handleDelete={handleDelete}
                    />
                  </div>
                </div>
              );
            })}

            <div className="lowest-price">
              <Image src="/static/images/lowest-price.png" />
              <span> You won't find it cheaper anywhere</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>Promo code can be applied on payment page</div>
          <Button
            onClick={handleCheckout}
            className="checkout-btn"
            variant="danger"
          >
            Proceed to Checkout Rs.{finalAmount}
          </Button>
        </Modal.Footer>
      </Modal>
      {showAlert && (
        <div className="alert-container">
          <Alert variant="success">
            <p>"Order Successfully Placed "</p>
          </Alert>
        </div>
      )}
    </>
  );
}

function CartFunctions({
  price,
  calcFinalAmount,
  handleDelete,
  name,
  product_id,
  quantity,
}) {
  const [counter, setCounter] = useState(quantity);
  const [amount, setAmount] = useState(price);
  const { setCartItems } = useContext(UserContext);

  const handleQuantityChange = (operator) => {
    let user_cart_items = JSON.parse(localStorage.getItem("user_cart_items"));
    user_cart_items.some((product) => {
      if (product.id === product_id) {
        if (operator === "+") {
          product.quantity = parseInt(product.quantity) + 1;
        } else {
          product.quantity = parseInt(product.quantity) - 1;
        }
        return true;
      }
      return false;
    });
    localStorage.setItem("user_cart_items", JSON.stringify(user_cart_items));
    setCartItems(user_cart_items);
  };

  const handlePlus = () => {
    handleQuantityChange("+");
    setCounter(counter + 1);
    setAmount((counter + 1) * price);
    calcFinalAmount(price);
  };
  const handleMinus = () => {
    handleQuantityChange("-");
    setCounter(counter - 1);
    setAmount((counter - 1) * price);
    calcFinalAmount(price, "-");
  };

  const deleteItem = () => {
    handleDelete(product_id);
    calcFinalAmount(counter * price, "-");
  };

  return (
    <>
      <div className="cart-functions">
        <Button
          disabled={counter === 1}
          className="rounded-btn"
          onClick={handleMinus}
          name="decrease quantity"
          aria-label="decrease quantity"
        >
          -
        </Button>
        <span className="item-quantity" data-testid="cart-product-counter">
          {counter}
        </span>
        <Button
          disabled={counter === 5}
          className="rounded-btn"
          name="increase quantity"
          aria-label="increase quantity"
          onClick={handlePlus}
        >
          +
        </Button>
        <button
          className="delete-svg"
          onClick={deleteItem}
          data-testid="delete-item-span"
        >
          <Image alt="delete item" src={DeleteIcon} />
        </button>
        <span className="item-base-price">x {price}</span>
        <span className="item-total-price">Rs. {amount}</span>
      </div>
    </>
  );
}
