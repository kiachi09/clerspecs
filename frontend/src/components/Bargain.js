import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { listProducts } from "../actions/productActions";
import { Container } from "react-bootstrap";
import LeftRightButton from "./LeftRightButton";
import Product from "./Product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Bargain = ({ responsive, category, products }) => {
  // const [type, setType] = useState(category);
  // const dispatch = useDispatch();
  // const productList = useSelector((state) => state.productList);
  // const { products } = productList;
  // useEffect(() => {
  //   dispatch(listProducts());
  // }, [dispatch]);
  return (
    <Container>
      <h4 style={{ color: "#2f99d1" }} className='text-center my-5'>
        <strong> Shop {category} at a bargain </strong>
      </h4>
      <Carousel
        responsive={responsive}
        ssr={true}
        infinite={true}
        arrows={false}
        autoPlaySpeed={1000}
        containerClass='carousel-container'
        removeArrowOnDeviceType={["tablet", "mobile"]}
        renderButtonGroupOutside={true}
        customButtonGroup={<LeftRightButton />}
        itemClass='px-1'
      >
        {category === "Eyeglasses" &&
          products
            .filter((product) => product.category === "Eyeglasses")
            .sort((a, b) => a.price - b.price)
            .slice(0, 5)
            .map((product) => <Product key={product._id} product={product} />)}
        {category === "Sunglasses" &&
          products
            .filter((product) => product.category === "Sunglasses")
            .sort((a, b) => a.price - b.price)
            .slice(0, 5)
            .map((product) => <Product key={product._id} product={product} />)}
        {category === "Contactlens" &&
          products
            .filter((product) => product.category === "Contactlens")
            .sort((a, b) => b.price - a.price)
            .slice(0, 5)
            .map((product) => <Product key={product._id} product={product} />)}
      </Carousel>
    </Container>
  );
};

export default Bargain;
