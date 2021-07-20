import React, { useContext, useState } from "react";
import { useHistory, Link, NavLink } from "react-router-dom";
import { Image, Navbar, Nav, Button, Container } from "react-bootstrap";
import { UserContext } from "../../user-context";
import ModalComponent from "../modal";
import Logo_Big from "../../../static/images/logo_2x.png";
import Logo from "../../../static/images/logo.png";
import Cart from "../../../static/images/cart.svg";
import "./navigation_bar.scss";

export default function NavigationBar(props) {
  const history = useHistory();
  const { isLoggedIn, setIsLoggedIn, numOfItems } = useContext(UserContext);

  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    history.push("/login");
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className="top-navigation-bar">
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <span className="main-app-logo">
            <Link to="/">
              <Image alt="Sabka Bazaar" src={Logo_Big} />
            </Link>
          </span>
          {isLoggedIn && (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Item>
                  <NavLink activeClassName="active-nav-link" to="/" exact>
                    Home
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    activeClassName="active-nav-link"
                    to="/products"
                    exact
                  >
                    Products
                  </NavLink>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          )}
        </Navbar>
        <div className="user-controls">
          {isLoggedIn ? (
            <Button
              className="logout-btn"
              variant="danger"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">Sign In</Link> &nbsp;
              <Link to="/register">Register</Link>
            </>
          )}

          {isLoggedIn && (
            <button
              aria-label="Cart"
              className="cart-svg"
              onClick={toggleModal}
            >
              <div>
                <Image alt="Cart" src={Cart} />
                {numOfItems}&nbsp;items
              </div>
            </button>
          )}
        </div>
      </div>
      <Container className="page-content" fluid>
        {props.children}
      </Container>

      {modalOpen && (
        <ModalComponent visible={modalOpen} toggleModal={toggleModal} />
      )}
    </>
  );
}
