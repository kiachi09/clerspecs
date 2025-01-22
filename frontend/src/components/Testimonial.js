import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, ListGroup, Image } from "react-bootstrap";
import CategoryButton from "../components/CategoryButton";
import LeftRightButton from "./LeftRightButton";

// import { listProducts } from "../actions/productActions";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Rating from "../components/Rating";

const Testimonial = ({ products }) => {
  const [type, setType] = useState("Eyeglasses");
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

  return (
    <Container>
      <>
        <Row
          xs={1}
          s={1}
          md={1}
          lg={4}
          xl={4}
          className='justify-content-between product-carousel-container'
        >
          <Col xl={4}>
            <CategoryButton setType={setType} classname='category-setting' />
          </Col>
          <Col xl={8}>
            <h4 style={{ color: "#2f99d1" }} className='text-end my-5'>
              {" "}
              <strong> Testimonials </strong>
            </h4>
          </Col>
          <Col></Col>
        </Row>
      </>

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
        {(type === "Eyeglasses" &&
          products
            .filter(
              (product) =>
                product.category === "Eyeglasses" && product.reviews.length > 0
            )
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 8)
            .map((product) => (
              <>
                <ListGroup>
                  <div className='testdiv d-flex flex-column justify-content-center'>
                    <div className='circle' style={{ verticalAlign: "middle" }}>
                      <Image
                        src={product.image}
                        alt='Reviewer'
                        className='avatar'
                      />
                    </div>
                    <h4 className='mt-2'>
                      <strong>{product.name}</strong>
                    </h4>
                  </div>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            ))) ||
          (type === "Sunglasses" &&
            products
              .filter(
                (product) =>
                  product.category === "Sunglasses" &&
                  product.reviews.length > 0
              )
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 8)
              .map((product) => (
                <>
                  <ListGroup>
                    <div className='testdiv'>
                      <div className='circle'>
                        <Image
                          src={product.image}
                          alt='Reviewer'
                          className='avatar'
                        />
                      </div>
                      <h4 className='mt-2'>
                        <strong>{product.name}</strong>
                      </h4>
                    </div>
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              ))) ||
          (type === "Contactlens" &&
            products
              .filter(
                (product) =>
                  product.category === "Contactlens" &&
                  product.reviews.length > 0
              )
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 5)
              .map((product) => (
                <>
                  <ListGroup>
                    <div className='testdiv'>
                      <div className='circle'>
                        <Image
                          src={product.image}
                          alt='Reviewer'
                          className='avatar'
                        />
                      </div>

                      <h4 className='mt-2'>
                        <strong>{product.name}</strong>
                      </h4>
                    </div>
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              )))}
      </Carousel>
    </Container>
  );
};

export default Testimonial;
