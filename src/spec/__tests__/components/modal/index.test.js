import React from "react";
import CartModal from "../../../../components/modal";
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

describe("Cart Modal component", () => {
  const setIsLoggedIn = (value) => {
    return value;
  };
  const user = {
    isLoggedIn: true,
    setIsLoggedIn,
    numOfItems: 3,
    cartItems,
    setCartItems: jest.fn(),
    setNumOfItems: jest.fn(),
  };

  const defaultProps = {
    visible: true,
    toggleModal: jest.fn(),
  };

  beforeEach(() => {
    localStorage.setItem("user_cart_items", JSON.stringify(cartItems));
    render(
      <UserContext.Provider value={user}>
        <CartModal {...defaultProps} />
      </UserContext.Provider>
    );
  });

  test("check render", () => {
    screen.debug();
  });

  test("delete button", () => {
    const deleteSpan = screen.getAllByTestId("delete-item-span")[0];
    fireEvent.click(deleteSpan);
  });

  test("close button", () => {
    const closeBtn = screen.getByRole("button", {
      name: /close/i,
    });

    // const closeSymbol = within(closeBtn).getByText(/x/i);

    fireEvent.click(closeBtn);

    expect(defaultProps.toggleModal).toHaveBeenCalled();
  });

  test("- button", (done) => {
    const decreseItem = screen.getAllByRole("button", {
      name: /decrease quantity/i,
    })[0];
    // screen.getAllByRole("button", { name: /\-/i })[0];
    fireEvent.click(decreseItem);
    const itemCounter = screen.getAllByTestId("cart-product-counter")[0];
    expect(decreseItem).toBeInTheDocument();

    expect(itemCounter).toHaveTextContent(/0/i);
    done();
  });

  test("- button", (done) => {
    const increaseItem = screen.getAllByRole("button", {
      name: /increase quantity/i,
    })[0];
    // screen.getAllByRole("button", { name: /\+/i })[0];
    fireEvent.click(increaseItem);
    const itemCounter = screen.getAllByTestId("cart-product-counter")[0];
    expect(increaseItem).toBeInTheDocument();

    expect(itemCounter).toHaveTextContent(/2/i);
    done();
  });

  afterAll(() => {
    localStorage.removeItem("user_cart_items");
    cleanup();
  });
});
