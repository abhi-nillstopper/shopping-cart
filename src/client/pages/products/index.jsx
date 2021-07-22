import React, { useEffect, useState, useContext } from "react";
import api from "../../helper/axios_api";
import { UserContext } from "../../user-context";
import { CategoriesDropdown } from "../../constant/categories";
import CardComponent from "../../components/card/index.tsx";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "./products_page.scss";

export default function ProductsPage(props) {
  const [products, setProducts] = useState([]);
  const [radioValue, setRadioValue] = useState("");
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      props.history.push("/login");
    } else {
      if (props.location.state) {
        const { categoryKey } = props.location.state;
        categoryKey && setRadioValue(categoryKey);
      }
    }
  }, []);

  useEffect(() => {
    fetchProducts(radioValue);
  }, [radioValue]);

  const fetchProducts = async (radioValue) => {
    try {
      const params = !radioValue ? {} : { params: { category: radioValue } };
      const response = await api.get("/api/products", params);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const dropDownHandler = (eventKey = "", event = "") => {
    setRadioValue(eventKey);
    document.querySelector("button.dropdown-toggle.btn-danger").innerHTML =
      event.target.innerHTML;
  };

  const OnClickCategory = (eventKey = "", event = "") => {
    setRadioValue(eventKey);
  };

  return (
    <>
      <div className="product-container">
        <div className="category-selector" data-testid="category-selector">
          {CategoriesDropdown.map((category, index) => {
            return (
              <div key={index}>
                <button
                  className={radioValue === category.value && "active-nav-link"}
                  onClick={() => OnClickCategory(category.value)}
                >
                  {category.name}
                </button>
              </div>
            );
          })}
        </div>

        <div className="category-selector-dropdown">
          <DropdownButton title="All Products" variant="danger">
            {CategoriesDropdown.map((item, index) => {
              return (
                <Dropdown.Item
                  key={item.value}
                  eventKey={item.value}
                  value={item.value}
                  active={item.value === radioValue}
                  onSelect={dropDownHandler}
                >
                  {item.name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>

        <div className="product-as-cards">
          {products.length > 0 &&
            products.map((product, index) => {
              return <CardComponent key={product.id} product={product} />;
            })}
        </div>
      </div>
    </>
  );
}
