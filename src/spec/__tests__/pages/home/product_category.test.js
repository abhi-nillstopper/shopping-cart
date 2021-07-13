import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import ProductCategory from "../../../../pages/home/product_category";
import api from "../../../../helper/axios_api";
import { categories } from "../../../__mocks__/home/payload";

describe("Product Category test", () => {
  let historyMock;
  beforeEach(() => {
    api.get = jest.fn(() => Promise.reject(errMessage));

    historyMock = { push: jest.fn() };
    render(
      <ProductCategory
        history={historyMock}
        categoryImages={categories.categories}
      />
    );
  });

  test("check render", () => {
    screen.debug();
  });

  it("should have the right message in the dom", (done) => {
    // const {getByRole} = render(
    //     <ProductCategory categoryImages={categories.categories} />
    //   );

    const heading = screen.getByRole("heading", {
      name: /beauty and hygiene/i,
    });

    expect(heading).toBeInTheDocument();
    done();
  });

  it("check all categories rendered", () => {
    const categoriesDiv = screen.getAllByTestId("category");
    expect(categoriesDiv.length).toBe(categories.categories.length);
  });

  test("click on category button", () => {
    const btn = screen.getByRole("button", { name: /beauty\-hygiene/i });
    fireEvent.click(btn);
    expect(historyMock.push).toHaveBeenCalled();
  });

  afterAll(cleanup);
});
