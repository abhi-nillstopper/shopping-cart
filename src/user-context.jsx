import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const ContextWrapper = (props) => {
  const setDefaultVaule = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return true;
    }
    return false;
  };

  const defaultNumOfItems = () => {
    const userCartItems = JSON.parse(localStorage.getItem("user_cart_items"));
    if (userCartItems.length > 0) {
      return userCartItems.length;
    }
    return 0;
  };

  const defaultCartItems = () => {
    const items = JSON.parse(localStorage.getItem("user_cart_items"));
    if (items) {
      return items;
    }
    return [];
  };

  const [isLoggedIn, setIsLoggedIn] = useState(setDefaultVaule);
  const [numOfItems, setNumOfItems] = useState(defaultNumOfItems);
  const [cartItems, setCartItems] = useState(defaultCartItems);

  const user = {
    isLoggedIn,
    setIsLoggedIn,
    numOfItems,
    setNumOfItems,
    cartItems,
    setCartItems,
  };

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
