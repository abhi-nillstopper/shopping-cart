import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/navigation_bar";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import ProductPage from "./pages/products";

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <NavigationBar>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/home" exact component={HomePage} />
            <Route path="/products" exact component={ProductPage} />
          </NavigationBar>
        </Switch>
      </BrowserRouter>
      <footer className="footer-bottom">
        Copyright &copy; &nbsp; 2020-2021 &nbsp;Sabka Bazar Grocery Supplies
        Pvt. Ltd
      </footer>
    </>
  );
}
