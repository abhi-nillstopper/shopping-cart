import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import HomePage from "../../../../pages/home";
import api from "../../../../helper/axios_api";
import { UserContext } from "../../../../user-context";
import { banners, categories } from "../../../__mocks__/home/payload";

const user = {
  isLoggedIn: true,
};

describe("HomePage test", () => {
  let home;
  beforeAll(async () => {
    const result = render(
      <UserContext.Provider value={user}>
        <HomePage />
      </UserContext.Provider>
    );
    home = result.container.querySelector(".home-container");
  });

  test("render HomePage", (done) => {
    screen.debug();
    done();
  });

  it("should have the right message in the dom", (done) => {
    const message = "";
    expect(screen.getByText(message)).toBeInTheDocument();
    done();
  });

  it("error getting categories", (done) => {
    const errMessage = { message: "No Categories found" };
    api.get = jest.fn(() => Promise.reject(errMessage));
    api.get("/api/categories").catch((err) => {
      expect(err).toBe(errMessage);
      done();
    });
  });

  it("get categories", (done) => {
    api.get = jest.fn(() => Promise.resolve({ data: { categories } }));
    api.get("/api/categories").then((resp) => {
      expect(resp).toStrictEqual({ data: { categories } });
      done();
    });
  });

  it("error getting banners", (done) => {
    const errMessage = { message: "No banners found" };
    api.get = jest.fn(() => Promise.reject(errMessage));
    api.get("/api/banners").catch((err) => {
      expect(err).toBe(errMessage);
      done();
    });
  });

  it("get banners", (done) => {
    api.get = jest.fn(() => Promise.resolve({ data: { banners } }));
    api.get("/api/banners").then((resp) => {
      expect(resp).toStrictEqual({ data: { banners } });
      done();
    });
  });

  it("should have Carousel", (done) => {
    // const homeContainer = result.container.querySelector("[data-testid='home-container']");
    // const homeContainer = screen.queryByTestId("home-container");
    // const carousel = result.container.querySelector("[data-testid='carousel-test']");
    const carousel = home.querySelector('[data-testid="carousel-test"]');
    // const carousel = await screen.getByTestId('carousel-test');
    expect(home).toContainElement(carousel);
    done();
  });

  it("should have Carousel", (done) => {
    const categories = home.querySelector(".product-categories");
    expect(home).toContainElement(categories);
    done();
  });

  afterAll(cleanup);
});
