import * as React from "react";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import ProductsPage from "../../../../pages/products";
import api from "../../../../helper/axios_api";
import { UserContext } from "../../../../user-context";
import { products } from "../../../__mocks__/products/payload";
// import * as apis from "../../../../helper/get_products";
// jest.mock("../../../../helper/get_products", ()=> {return {fetchProducts(){
// return Promise.resolve({name: "abhi"})
// }}})

describe("Product Page test", () => {
  let historyMock = { push: jest.fn() };
  let ProductContainer: RenderResult;

  // let locationMock:{ [key: string]: any } = { state: { categoryKey: null } };
  const user = {
    isLoggedIn: true,
  };

  beforeEach(() => {
    const defaultProps = {
      history: historyMock,
      location: { state: { categoryKey: null } },
    };

    ProductContainer = render(
      <UserContext.Provider value={user}>
        <ProductsPage {...defaultProps} />
      </UserContext.Provider>
    );
  });

  test("check if page renderes correctly", () => {
    screen.debug();
  });

  it("api should be called", (done) => {
    api.get = jest.fn(() => Promise.resolve<any>({ data: { products } }));

    const categoryBeverages = screen.getByText(/beverages/i);
    fireEvent.click(categoryBeverages);

    expect(api.get).toHaveBeenCalled();
    done();
  });

  // test("product category selector",async (done) => {
  //   const categorySelector = await screen.findByTestId("category-selector")

  //   console.log("categorySelector", categorySelector);
  //   expect(categorySelector).toBeInTheDocument();
  //   // done();
  // });

  afterAll(cleanup);
});
