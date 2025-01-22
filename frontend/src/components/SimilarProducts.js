import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import LeftRightButton from "./LeftRightButton";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SimilarProducts = ({ similarIds }) => {
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

  let similarbox = [];

  function similarproducts(similarIds) {
    if (!similarIds) {
      return [];
    }
    // console.log("good till here");
    const data = products.filter((product) => similarIds.includes(product._id));

    return data;
  }
  similarbox = similarproducts(similarIds);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, similarIds]);
  return (
    <Container>
      <Row
        xs={1}
        s={1}
        md={1}
        lg={4}
        xl={4}
        className='justify-content-center mt-2 mb-5'
      >
        <Col className='text-center'>
          <h1 style={{ color: "#2f99d1", border: "1px solid black" }}>
            {" "}
            <strong> Similar Products</strong>
          </h1>
        </Col>
      </Row>

      <Carousel
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        arrows={false}
        autoPlaySpeed={1000}
        containerClass='carousel-container'
        removeArrowOnDeviceType={["tablet", "mobile"]}
        renderButtonGroupOutside={true}
        customButtonGroup={<LeftRightButton />}
        itemClass='px-1'
      >
        {similarbox.length === 0 ? (
          <p>No similar products available.</p>
        ) : (
          similarbox.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </Carousel>
    </Container>
  );
};

export default SimilarProducts;
