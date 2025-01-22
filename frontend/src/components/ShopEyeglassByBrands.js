import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
// import { useDispatch, useSelector } from "react-redux";
import LeftRightButton from "./LeftRightButton";
import "react-multi-carousel/lib/styles.css";
import HomePageCards from "./HomePageCards";
// import { listProducts } from "../actions/productActions";
// import { listProductEyeGlassBrands } from "../actions/productActions";

const ShopEyeglassByBrands = ({ responsive, products }) => {
  // const dispatch = useDispatch();
  // const productList = useSelector((state) => state.productList);
  // const { products } = productList;
  // const brandsEyeGlassList = useSelector(
  //   (state) => state.productEyeGlassBrandsList
  // );
  // const { brands } = brandsEyeGlassList;

  // useEffect(() => {
  //   // dispatch(listProductEyeGlassBrands());
  //   dispatch(listProducts());
  // }, [dispatch]);
  return (
    <Container>
      <h4 style={{ color: "#2f99d1" }} className='text-center my-5'>
        <strong>Shop Eyeglasses by Brands</strong>
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
          .filter((product) => product.category === "EyeglassesBrand")
          .map((product, index) => (
            <HomePageCards
              key={index}
              title={product.brand}
              image={product.image}
              link={`/specs/brand-${product.brand}`}
            />
          ))}
      </Carousel>
    </Container>
  );
};

export default ShopEyeglassByBrands;
