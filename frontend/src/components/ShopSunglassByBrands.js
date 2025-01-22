import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
// import { useDispatch, useSelector } from "react-redux";
import LeftRightButton from "./LeftRightButton";
import "react-multi-carousel/lib/styles.css";
import HomePageCards from "./HomePageCards";
// import { listProducts } from "../actions/productActions";

// import { listProductSunGlassBrands } from "../actions/productActions";

const ShopSunglassByBrands = ({ products, responsive }) => {
  // const dispatch = useDispatch();
  // const productList = useSelector((state) => state.productList);
  // const { products } = productList;
  // // const brandsSunGlassList = useSelector(
  // //   (state) => state.productSunGlassBrandsList
  // // );
  // // const { brands } = brandsSunGlassList;
  // // console.log(brands);

  // useEffect(() => {
  //   dispatch(listProducts());
  //   // dispatch(listProductSunGlassBrands());
  // }, [dispatch]);
  return (
    <Container>
      <h4 style={{ color: "#2f99d1" }} className='text-center my-5'>
        <strong>Shop Sunglasses by Brands</strong>
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
          .filter((product) => product.category === "SunglassesBrand")
          .map((product, index) => (
            <HomePageCards
              key={index}
              title={product.brand}
              image={product.image}
              link={`/goggles/brand-${product.brand}`}
            />
          ))}
      </Carousel>
    </Container>
  );
};

export default ShopSunglassByBrands;
