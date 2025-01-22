import React, { useState, useEffect } from "react";
import HomePageCarousel from "../components/HomePageCarousel";
import NewProductCarousel from "../components/NewProductCarousel";
import ShopEyeglassByBrands from "../components/ShopEyeglassByBrands";
import ShopSunglassByBrands from "../components/ShopSunglassByBrands";
import { Image, Row, Col, Button } from "react-bootstrap";
import ShopContactlensByBrands from "../components/ShopContactlensByBrands";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Bargain from "../components/Bargain";
import Testimonial from "../components/Testimonial";

// import { useDispatch } from "react-redux";

const NewHomeScreen = () => {
  //   const dispatch = useDispatch();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const eyeglassesProducts = products.filter(
    (product) => product.category === "Eyeglasses" && product.reviews.length > 0
  );
  const sunglassesProducts = products.filter(
    (product) => product.category === "Sunglasses" && product.reviews.length > 0
  );
  const contactLensProducts = products.filter(
    (product) =>
      product.category === "Contactlens" && product.reviews.length > 0
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <HomePageCarousel />
      <NewProductCarousel products={products} />
      <ShopEyeglassByBrands responsive={responsive} products={products} />
      <Bargain
        responsive={responsive}
        category='Eyeglasses'
        products={products}
      />
      <Image
        style={{ maxHeight: "400px", width: "100%" }}
        src='../../staticuploads/ScreenPic1.jpg'
        fluid
      />
      <ShopSunglassByBrands responsive={responsive} products={products} />
      <Bargain
        responsive={responsive}
        category='Sunglasses'
        products={products}
      />
      <Image
        style={{ maxHeight: "400px", width: "100%" }}
        src='../../staticuploads/ScreenPic2.jpg'
        fluid
      />
      <ShopContactlensByBrands responsive={responsive} products={products} />
      <Bargain
        responsive={responsive}
        category='Contactlens'
        products={products}
      />
      <Image
        style={{ maxHeight: "400px", width: "100%" }}
        src='../../staticuploads/ScreenPic3.jpg'
        fluid
      />
      {/* tESTINOMAIALS OF PRODUCTS */}
      {eyeglassesProducts.length > 0 &&
      sunglassesProducts.length > 0 &&
      contactLensProducts.length > 0 ? (
        <Testimonial products={products} />
      ) : (
        <h4
          style={{
            marginTop: "5rem",
            marginBottom: "5rem",
            marginLeft: "5rem",
          }}
        >
          {" "}
          Testimonials Coming soon ...{" "}
        </h4>
      )}

      <Row className='mt-2'>
        <Col md={12}>
          <div
            className=' position-relative bg-image bg-overlay-60'
            style={{
              backgroundImage: `url("../../staticuploads/ScreenPic11.jpg")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",

              transformOrigin: "center center",
            }}
          >
            <Row>
              <Col md={{ span: 3, offset: 8 }}>
                <div
                  style={{ textAlign: "center", marginTop: "5rem" }}
                  className=' position-relative z-index-1 '
                >
                  <h1
                    style={{ textAlign: "justify", color: "#747875" }}
                    className='display-4'
                  >
                    With{" "}
                    <strong style={{ color: "#4f48ff" }}> ClersSpces's </strong>{" "}
                    Help -<strong style={{ color: "#1f48ff" }}> Evolve </strong>
                    <strong style={{ color: "#780630" }}>As A</strong>
                    <strong style={{ color: "pink" }}> Buyer</strong>
                  </h1>
                  <Button
                    className='mt-1 mb-5 shadow rounded'
                    // href='#pro'
                    type='Button'
                    onClick={() =>
                      (window.location.href =
                        "https://www.clearly.ca/thelook/glasses-for-face-shape")
                    }
                  >
                    SEE MORE
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default NewHomeScreen;
