import * as React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import RegisterPage from "../../../../pages/register";
import api from "../../../../helper/axios_api";
import { UserContext } from "../../../../user-context";
import {
  errResponse,
  userResponse,
  alertMsg,
  emailExist,
  errAlertMsg,
} from "../../../__mocks__/register/payload";


describe("RegisterPage test", () => {
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
        <RegisterPage history={historyMock} />
      </UserContext.Provider>
    );
  });

  test("check render", () => {
    screen.debug();
  });

  it("check submit button", () => {
    const signup = screen.getByRole("button", {
      name: /signup/i,
    });

    expect(signup).toBeInTheDocument();
  });

  it("form submit success", (done) => {
    api.post = jest.fn(() => Promise.resolve<any>({ data: userResponse }));
    let event = {
      preventDefault: jest.fn(),
    };
    localStorage.setItem = jest.fn(() => {
      return;
    });
    const form = screen.getByTestId("register-form");
    const firstName = screen.getByRole("textbox", {
      name: /first name/i,
    });

    const lastName = screen.getByRole("textbox", {
      name: /last name/i,
    });

    const email = screen.getByRole("textbox", {
      name: /last name/i,
    });

    const password = screen.getByLabelText("Password");

    const confirmPass = screen.getByLabelText(/confirm password/i);

    fireEvent.change(firstName, {
      target: { value: "Joe", name: "firstName" },
    });
    fireEvent.change(lastName, {
      target: { value: "Doe", name: "lastName" },
    });
    fireEvent.change(email, {
      target: { value: "joe@yop.com", name: "email" },
    });
    fireEvent.change(password, {
      target: { value: "12345", name: "password" },
    });
    fireEvent.change(firstName, {
      target: { value: "12345", name: "samePassword" },
    });

    fireEvent.submit(form, event);

    expect(api.post).toHaveBeenCalled();
    // expect(historyMock.push).toHaveBeenCalled();
    done();
  });

  it("form submit: email already exist", (done) => {
    api.post = jest.fn(() => Promise.resolve<any>({ data: emailExist }));
    let event = {
      preventDefault: jest.fn(),
    };
    localStorage.setItem = jest.fn(() => {
      return;
    });
    const form = screen.getByTestId("register-form");
    const firstName = screen.getByRole("textbox", {
      name: /first name/i,
    });

    const lastName = screen.getByRole("textbox", {
      name: /last name/i,
    });

    const email = screen.getByRole("textbox", {
      name: /last name/i,
    });

    const password = screen.getByLabelText("Password");

    const confirmPass = screen.getByLabelText(/confirm password/i);

    fireEvent.change(firstName, {
      target: { value: "Joe", name: "firstName" },
    });
    fireEvent.change(lastName, {
      target: { value: "Doe", name: "lastName" },
    });
    fireEvent.change(email, {
      target: { value: "joe@yop.com", name: "email" },
    });
    fireEvent.change(password, {
      target: { value: "12345", name: "password" },
    });
    fireEvent.change(firstName, {
      target: { value: "12345", name: "samePassword" },
    });

    const alert = screen.getByRole("alert");
    fireEvent.submit(form, event);

    expect(api.post).toHaveBeenCalled();
    expect(alert).toHaveTextContent(alertMsg);

    // expect(historyMock.push).toHaveBeenCalled();
    done();
  });

  it("form submit fail", (done) => {
    // api.post = jest.fn(() => Promise.resolve<any>(emailExist));

    let event = {
      preventDefault: jest.fn(),
    };
    const form = screen.getByTestId("register-form");
    const alert = screen.getByRole("alert");
    fireEvent.submit(form, event);
    expect(alert).toHaveTextContent(errAlertMsg);
    done();
  });

  it("form submit error", (done) => {
    api.post = jest.fn(() => Promise.reject<any>(errResponse));

    jest.spyOn(window, "setTimeout");
    let event = {
      preventDefault: jest.fn(),
    };
    const form = screen.getByTestId("register-form");
    const firstName = screen.getByRole("textbox", {
        name: /first name/i,
      });
  
      const lastName = screen.getByRole("textbox", {
        name: /last name/i,
      });
  
      const email = screen.getByRole("textbox", {
        name: /last name/i,
      });
  
      const password = screen.getByLabelText("Password");
  
      const confirmPass = screen.getByLabelText(/confirm password/i);
  
      fireEvent.change(firstName, {
        target: { value: "Joe", name: "firstName" },
      });
      fireEvent.change(lastName, {
        target: { value: "Doe", name: "lastName" },
      });
      fireEvent.change(email, {
        target: { value: "joe@yop.com", name: "email" },
      });
      fireEvent.change(password, {
        target: { value: "12345", name: "password" },
      });
      fireEvent.change(firstName, {
        target: { value: "12345", name: "samePassword" },
      });
    const alert = screen.getByRole("alert");
    fireEvent.submit(form, event);
    expect(alert).toHaveTextContent(alertMsg);
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
        <RegisterPage history={historyMock} />
      </UserContext.Provider>
    );
  });
  it("check is user logged in", () => {
    expect(historyMock.push).toHaveBeenCalled();
  });

  afterAll(cleanup);
});
