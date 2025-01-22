import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
// import { useDispatch, useSelector } from "react-redux";
import LeftRightButton from "./LeftRightButton";
import "react-multi-carousel/lib/styles.css";
import HomePageCards from "./HomePageCards";
// import { listProducts } from "../actions/productActions";

const ShopContactlensByBrands = ({ responsive, products }) => {
  // const dispatch = useDispatch();
  // const productList = useSelector((state) => state.productList);
  // const { products } = productList;
  // useEffect(() => {
  //   dispatch(listProducts());
  // }, [dispatch]);

  return (
    <Container>
      <h4 style={{ color: "#2f99d1" }} className='text-center my-5'>
        <strong>Shop Contact lenses by Brands</strong>
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
        {products
          .filter((product) => product.category === "ContactlensBrand")
          .map((product, index) => (
            <HomePageCards
              key={index}
              title={product.brand}
              image={product.image}
              link={`/Contactlens/brand-${product.brand}`}
            />
          ))}
      </Carousel>
    </Container>
  );
};

export default ShopContactlensByBrands;
