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
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/products" component={ProductPage} />
            {/* <Route path="*" component={HomePage} /> */}
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
