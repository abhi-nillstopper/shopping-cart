import React, { useState, useEffect, useContext } from "react";
import { Carousel, Image } from "react-bootstrap";
import ProductCategory from "./product_category";
import { UserContext } from "../../user-context";
// import { importAll } from "../../helper/import_all";
import api from "../../helper/axios_api";
import "./home_page.scss";

export default function HomePage(props) {
  const [OfferImages, setOfferImages] = useState([]);
  const [categoryImages, setCategoryImages] = useState([]);
  const { isLoggedIn } = useContext(UserContext);

  const fetchOfferImages = async () => {
    try {
      const response = await api.get("/banners");
      setOfferImages(response.data.banners);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchcategoryImages = async () => {
    try {
      const response = await api.get("/categories");
      setCategoryImages(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      props.history.push("/login");
    } else {
      fetchOfferImages();
      fetchcategoryImages();
    }
  }, []);

  // const OfferImages = importAll(
  //   require.context(
  //     "../../../static/images/offers",
  //     false,
  //     /\.(png|jpe?g|svg)$/
  //   )
  // );

  return (
    <>
      <div className="home-container" data-testid="home-container">
        <Carousel data-testid="carousel-test" fade>
          {OfferImages.map((ofImg, index) => {
            return (
              <Carousel.Item key={index} interval={2000}>
                <Image
                  className="d-block w-100"
                  src={ofImg.bannerImageUrl}
                  alt={ofImg.bannerImageAlt}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>

        <ProductCategory history={props.history} categoryImages={categoryImages} />
      </div>
    </>
  );
}
