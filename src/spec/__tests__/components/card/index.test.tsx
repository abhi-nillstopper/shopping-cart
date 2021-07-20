import * as React from "react";
import CardComponent from "../../../../components/card";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  within,
} from "@testing-library/react";
import api from "../../../../helper/axios_api";
import { UserContext } from "../../../../user-context";
import { cartItems } from "../../../__mocks__/navigation_bar/payload";
import {
  productAlreadyInCart,
  productNotInCart,
} from "../../../__mocks__/card/payload";

describe("Card component", () => {
  const user = {
    numOfItems: 4,
    cartItems,
    setCartItems: jest.fn(),
    setNumOfItems: jest.fn(),
  };

  //   beforeEach(() => {
  //     // localStorage.setItem("user_cart_items", JSON.stringify(cartItems));

  //     render(
  //       <UserContext.Provider value={user}>
  //         <CardComponent {...defaultProps} />
  //       </UserContext.Provider>
  //     );
  //   });

  test("check render", () => {
    const defaultProps = {
      product: productAlreadyInCart,
    };
    render(
      <UserContext.Provider value={user}>
        <CardComponent {...defaultProps} />
      </UserContext.Provider>
    );
    screen.debug();
  });

  test("buy now button: Product Already In Cart", () => {
    const defaultProps = {
      product: productAlreadyInCart,
    };
    render(
      <UserContext.Provider value={user}>
        <CardComponent {...defaultProps} />
      </UserContext.Provider>
    );
    localStorage.setItem("user_cart_items", JSON.stringify(cartItems));
    localStorage.setItem("numOfProductsInCart", cartItems.length.toString());

    const buyBtn = screen.getAllByRole("button", {
      name: /buy now/i,
    })[0];

    fireEvent.click(buyBtn);
    expect(localStorage.getItem("numOfProductsInCart")).toBe(4 + "");
  });

  test("buy now button: Product not In Cart", () => {
    const defaultProps = {
      product: productNotInCart,
    };
    render(
      <UserContext.Provider value={user}>
        <CardComponent {...defaultProps} />
      </UserContext.Provider>
    );
    localStorage.setItem("user_cart_items", JSON.stringify(cartItems));
    localStorage.setItem("numOfProductsInCart", cartItems.length.toString());

    const buyBtn = screen.getAllByRole("button", {
      name: /buy now/i,
    })[0];

    fireEvent.click(buyBtn);
    expect(localStorage.getItem("numOfProductsInCart")).toBe(5 + "");
  });

  afterAll(() => {
    localStorage.removeItem("user_cart_items");
    localStorage.removeItem("numOfProductsInCart");
    cleanup();
  });
});
