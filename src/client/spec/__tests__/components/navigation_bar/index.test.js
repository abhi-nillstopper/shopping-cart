import React from "react";
import NavigationBar from "../../../../components/navigation_bar";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
// import api from "../../../../helper/axios_api";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../../../user-context";
import { cartItems } from "../../../__mocks__/navigation_bar/payload";

describe("NavigationBar component", () => {
  let historyMock;
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

  beforeEach(() => {
    historyMock = { push: jest.fn() };
    render(
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <NavigationBar history={historyMock} />
        </BrowserRouter>
      </UserContext.Provider>
    );
  });

  test("check render", () => {
    screen.debug();
  });

  it("check logout", () => {
    const logout = screen.getByRole("button", {
      name: /logout/i,
    });
    // jest.spyOn(localStorage, "removeItem");
    expect(logout).toBeInTheDocument();
    fireEvent.click(logout);
    expect(localStorage.getItem("user")).toBe(null);
  });

  it("cart button", (done) => {
    const cart = screen.getByRole('button', {
      name: /cart/i
    });
    // screen.getByRole("button", {
    //   name: /items/i,
    // });

    localStorage.setItem("user_cart_items", JSON.stringify(cartItems));

    fireEvent.click(cart);
    const dialogModal = screen.getByRole("dialog");
    expect(dialogModal).toBeInTheDocument();
    done();
  });

  afterAll(cleanup);
});
