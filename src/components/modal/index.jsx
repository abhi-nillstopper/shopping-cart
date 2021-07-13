import React, { useEffect, useState, useContext, reactc, useMemo } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { UserContext } from "../../user-context";
import DeleteIcon from "../../svgs/delete_fill.svg";
import "./modal.scss";

export default function ModalComponent(props) {
  const [show, setShow] = useState(false);
  const { cartItems, numOfItems, setCartItems, setNumOfItems } =
    useContext(UserContext);

  const reduceFunc = (sum, item) => {
    return sum + item.price;
  };

  let user_cart_items = JSON.parse(localStorage.getItem("user_cart_items"));

  useEffect(() => {
    let user_cart_items = JSON.parse(localStorage.getItem("user_cart_items"));
    setFinalAmount(user_cart_items.reduce(reduceFunc, 0));
  }, []);

  const [finalAmount, setFinalAmount] = useState(
    user_cart_items.reduce(reduceFunc, 0)
  );

  // useEffect(() => {
  //   setFinalAmount(cartItems.reduce(reduceFunc, 0));
  // }, []);

  useEffect(() => {
    setShow(props.visible);
  });

  const handleClose = () => {
    setShow(false);
    props.toggleModal();
  };

  const calcFinalAmount = (newAmount, op = "+") => {
    console.log(finalAmount, op, newAmount);
    if (op === "+") {
      setFinalAmount(finalAmount + newAmount);
    } else {
      setFinalAmount(finalAmount - newAmount);
    }
  };

  const handleDelete = (name) => {
    const newCartItems = cartItems.filter((obj) => obj.name !== name) || [];
    setCartItems(newCartItems);
    setNumOfItems(newCartItems.length);
    localStorage.setItem("user_cart_items", JSON.stringify(newCartItems));
    localStorage.setItem("numOfProductsInCart", newCartItems.length);
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
                  <Image className="item-img" src={item.imageURL} />
                  <div className="product-info">
                    <div>
                      <h6 title={item.name}>{item.name}</h6>
                    </div>
                    <CartFunctions
                      calcFinalAmount={calcFinalAmount}
                      price={item.price}
                      name={item.name}
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
          <Button className="checkout-btn" variant="danger">
            Proceed to Checkout &nbsp;&nbsp;&nbsp; Rs.{finalAmount} &nbsp;
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function CartFunctions({ price, calcFinalAmount, handleDelete, name }) {
  const [counter, setCounter] = useState(1);
  const [amount, setAmount] = useState(price);

  const handlePlus = () => {
    setCounter(counter + 1);
    setAmount((counter + 1) * price);
    calcFinalAmount(price);
  };
  const handleMinus = () => {
    setCounter(counter - 1);
    setAmount((counter - 1) * price);
    calcFinalAmount(price, "-");
  };

  const deleteItem = () => {
    handleDelete(name);
    calcFinalAmount(counter * price, "-");
  };

  return (
    <>
      <div className="cart-functions">
        <Button
          disabled={counter === 0}
          className="rounded-btn"
          onClick={handleMinus}
        >
          -
        </Button>
        <span>&nbsp;&nbsp;&nbsp;&nbsp; {counter} &nbsp;&nbsp;&nbsp;&nbsp;</span>
        <Button
          disabled={counter === 5}
          className="rounded-btn"
          onClick={handlePlus}
        >
          +
        </Button>
        <span className="delete-svg" onClick={deleteItem}>
          <Image src={DeleteIcon} />
        </span>
        <span className="item-base-price">
          &nbsp; x &nbsp;&nbsp;&nbsp;&nbsp; {price}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span className="item-total-price">Rs. &nbsp; {amount}</span>
      </div>
    </>
  );
}
