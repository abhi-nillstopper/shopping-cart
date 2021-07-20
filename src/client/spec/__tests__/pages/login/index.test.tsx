import * as React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import LoginPage from "../../../../pages/login";
import api from "../../../../helper/axios_api";
import { UserContext } from "../../../../user-context";
import { userResponse, noUserResponse } from "../../../__mocks__/login/payload";

describe("LoginPage test", () => {
  let historyMock;
  const setIsLoggedIn = (value: boolean) => {
    return value;
  };
  const user = {
    isLoggedIn: false,
    setIsLoggedIn,
  };

  beforeEach(() => {
    historyMock = { push: jest.fn() };
    render(
      <UserContext.Provider value={user}>
        <LoginPage history={historyMock} />
      </UserContext.Provider>
    );
  });

  test("check render", () => {
    screen.debug();
  });

  it("check submit button", () => {
    // let event = jest.fn(() => {});

    const submit = screen.getByRole("button", {
      name: /login/i,
    });

    expect(submit).toBeInTheDocument();
  });

  it("form submit", (done) => {
    api.post = jest.fn(() => Promise.resolve<any>({ data: userResponse }));
    let event = {
      preventDefault: jest.fn(),
    };
    localStorage.setItem = jest.fn(() => {
      return;
    });
    const form = screen.getByTestId("login-form");
    fireEvent.submit(form, event);
    expect(api.post).toHaveBeenCalled();
    // expect(historyMock.push).toHaveBeenCalled();
    done();
  });

  it("form submit fail", (done) => {
    api.post = jest.fn(() => Promise.resolve<any>({ data: noUserResponse }));

    let event = {
      preventDefault: jest.fn(),
    };

    const form = screen.getByTestId("login-form");
    const alert = screen.getByRole("alert");
    fireEvent.submit(form, event);
    expect(alert).toHaveTextContent("Enter Login credentials");
    done();
  });

  it("form submit error", (done) => {
    api.post = jest.fn(() =>
      Promise.reject<any>({ message: "Error while registerering user" })
    );

    jest.spyOn(window, 'setTimeout');
    let event = {
      preventDefault: jest.fn(),
    };

    const form = screen.getByTestId("login-form");
    const alert = screen.getByRole("alert");
    fireEvent.submit(form, event);
    expect(alert).toHaveTextContent("Enter Login credentials");
    done();
  });

  afterAll(cleanup);
});

describe("check logged in", () => {
  let historyMock = { push: jest.fn() };
  const user = {
    isLoggedIn: true,
  };
  beforeEach(() => {
    render(
      <UserContext.Provider value={user}>
        <LoginPage history={historyMock} />
      </UserContext.Provider>
    );
  });
  it("check is user logged in", () => {
    expect(historyMock.push).toHaveBeenCalled();
  });

  afterAll(cleanup);
});
