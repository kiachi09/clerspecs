import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import FilterModal from "../components/FilterModal";
import { Row, Col, Button, Container } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import InfiniteScroll from "react-infinite-scroll-component";

// import Cover from "../../staticuploads/ScreenPic4.jpg";

import Meta from "../components/Meta";

import { useDispatch, useSelector } from "react-redux";
import { speclistProducts } from "../actions/productActions";

const SpecScreen = ({ match, history }) => {
  const threeMothsAgo = new Date();
  const [visibleProducts, setVisibleProducts] = useState(12);
  threeMothsAgo.setMonth(threeMothsAgo.getMonth() - 3);
  const timestamp = threeMothsAgo.toISOString();
  const [type, setType] = useState("");
  const [FilteredValues, setFilteredValues] = useState([]);
  const [specificCategory, setspecificCategory] = useState("");
  const [specificValue, setspecificValue] = useState("");
  const dispatch = useDispatch();
  const productSpecList = useSelector((state) => state.productSpecList);
  const { loading, error, products } = productSpecList;

  const loadMore = () => {
    setTimeout(() => {
      // Simulate loading delay with setTimeout
      setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 12); // Increment the number of visible products
    }, 1000); // Wait for 2 seconds before loading more products
  };

  const filterProducts = (products, FilteredValues) => {
    const { PriceRange, brand, gender, shape } = FilteredValues;

    let minPrice;
    let maxPrice;

    if (PriceRange === 0) {
      minPrice = 0;
      maxPrice = 10000000;
    } else {
      minPrice = (PriceRange - 1) * 100;
      maxPrice = PriceRange * 100;
    }
    console.log(minPrice, maxPrice);

    return products.filter((product) => {
      if (product.price <= minPrice || product.price >= maxPrice) {
        return false;
      }

      if (brand && product.brand !== brand) {
        return false;
      }

      if (gender && product.gender !== gender) {
        return false;
      }

      if (shape && product.shape !== shape) {
        return false;
      }

      return true;
    });
  };

  useEffect(() => {
    dispatch(speclistProducts());
    if (match && match.params && match.params.value) {
      const data = match.params.value.split("-");
      setspecificCategory(data[0]);
      setspecificValue(data[1]);
      setType("specific");
    } else {
      setType("All");
    }
  }, [dispatch, match.params.value, match]);

  return (
    <>
      <Meta />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {/* <Modal
            size='xl'
            centered
            animation
            backdrop='static'
            keyboard={false}
            show={show}
            onHide={handleClose}
          >
            <Modal.Header style={{ display: "block", textAlign: "center" }}>
              <Modal.Title>Choose Your Style</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className='h-100 text-center'>
                <Col
                  style={{ paddingRight: "0px" }}
                  className='text-center'
                  xs={3}
                >
                  <Button
                    size='sm'
                    style={{
                      backgroundColor: "#2F99D1",
                      margin: "50% auto",
                    }}
                    className=' shadow  rounded'
                    onClick={handleClose1}
                    type='button'
                  >
                    Men
                  </Button>
                </Col>
                <Col xs={3}>
                  <Image
                    style={{ height: "80%" }}
                    src={Modelmen}
                    fluid
                    className=' rounded'
                  />
                </Col>

                <Col xs={3}>
                  <Image
                    style={{ height: "84%" }}
                    src={Modelwomen}
                    fluid
                    className=' rounded'
                  />
                </Col>

                <Col
                  style={{ paddingLeft: "0px" }}
                  className='text-center'
                  xs={3}
                >
                  <Button
                    size='sm'
                    style={{
                      backgroundColor: "#2F99D1",
                      margin: "50% auto",
                    }}
                    className='shadow rounded'
                    onClick={handleClose2}
                    type='button'
                  >
                    Women
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal> */}

          <Row className=''>
            <Col md={12}>
              <div
                className=' position-relative bg-image bg-overlay-60'
                style={{
                  backgroundImage: `url("../../staticuploads/ScreenPic4.jpg")`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  animation: " moveBackground 12s ease-in-out infinite",
                  transformOrigin: "center center",
                }}
              >
                <Row>
                  <Col md={{ span: 3, offset: 1 }}>
                    <div
                      style={{ textAlign: "center", marginTop: "5rem" }}
                      className='  position-relative z-index-1 '
                    >
                      <h1
                        style={{ textAlign: "justify" }}
                        className='display-4 text-black'
                      >
                        <strong style={{ color: "#2f99d1" }}>
                          ClersSpces's
                        </strong>{" "}
                        EyeGlasses The
                        <strong style={{ color: "#27f57d" }}> Best </strong> You
                        Can Get
                      </h1>
                      <Button
                        className='mt-1 mb-5 shadow rounded'
                        // href='#pro'
                        type='Button'
                        onClick={() => history.push(`/specs`)}
                      >
                        SEE MORE
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Container className='mt-3'>
            {type === "BestRatedWithValue" && (
              <h1 id='pro' className='text-center'>
                <Button
                  // href='#pro1'
                  className=' buts shadow btn-light rounded'
                  type='button'
                  onClick={() => setType("specific")}
                >
                  {`All ${specificValue} Eyeglasses`}
                </Button>
                {}
              </h1>
            )}

            {match.params.value ? (
              type === "BestRatedWithValue" ? (
                <></>
              ) : (
                <h1 id='pro' className='text-center'>
                  <Button
                    className=' buts shadow btn-light rounded'
                    type='button'
                    onClick={() => setType("BestRatedWithValue")}
                  >
                    {`Best Rated ${specificValue} Eyeglasses`}
                  </Button>
                </h1>
              )
            ) : (
              <h1 id='pro' className='text-center'>
                <Button
                  // href='#pro1'
                  className=' buts shadow btn-light rounded'
                  type='button'
                  onClick={() => setType("All")}
                >
                  ALL
                </Button>{" "}
                <Button
                  // href='#pro1'
                  className=' buts shadow btn-light rounded'
                  type='button'
                  onClick={() => setType("NewArrivals")}
                >
                  NEW ARRIVALS
                </Button>{" "}
                <Button
                  // href='#pro1'
                  className='buts shadow btn-light rounded'
                  type='button'
                  onClick={() => setType("Popular")}
                >
                  POPULAR
                </Button>
              </h1>
            )}

            <h2 className='text-end'>
              <FilterModal
                Existingvalue={match}
                FilteredValues={FilteredValues}
                setFilteredValues={setFilteredValues}
                setType={setType}
                products={products}
                type={type}
              />
            </h2>
            {/* <br id='pro1'></br> */}
            <hr></hr>
            {type === "All" && (
              // <Row>
              //   <h4>Our Wide Range Of Eyeglasses</h4>
              //   {products.map((product) => (
              //     <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
              //       <Product product={product} />
              //     </Col>
              //   ))}
              // </Row>
              <InfiniteScroll
                dataLength={visibleProducts}
                next={loadMore}
                hasMore={visibleProducts > products.length ? false : true} // Set this to false if you don't have more products to load
                // loader={<Loader />} // Display a loading indicator while loading more products
              >
                <Row>
                  <h4>Our Wide Range Of Eyeglasses</h4>
                  {products.slice(0, visibleProducts).map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
              </InfiniteScroll>
            )}
            {/* popular mein instead of numreviews numSold would be better  */}
            {type === "Popular" && (
              <Row>
                <h4>Popular Eyeglasses</h4>
                {products
                  .filter((product) => product.numReviews >= 200)
                  .map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                      <Product product={product} />
                    </Col>
                  ))}
              </Row>
            )}

            {type === "NewArrivals" && (
              <Row>
                <h4>Newly Arrived Eyeglasses</h4>
                {products
                  .filter(
                    (product) =>
                      new Date(product.createdAt) > new Date(timestamp)
                  )
                  .map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                      <Product product={product} />
                    </Col>
                  ))}
              </Row>
            )}

            {type === "BestRatedWithValue" &&
              ((specificCategory === "brand" && (
                <Row>
                  <h4>{`Best Rated ${specificValue} Eyeglasses`}</h4>
                  {products
                    .filter((product) => product.brand === `${specificValue}`)
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5)
                    .map((product) => (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                        <Product product={product} />
                      </Col>
                    ))}
                </Row>
              )) ||
                (specificCategory === "shape" && (
                  <Row>
                    <h4>{`Best Rated ${specificValue} Eyeglasses`}</h4>
                    {products
                      .filter((product) => product.shape === `${specificValue}`)
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 5)
                      .map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                          <Product product={product} />
                        </Col>
                      ))}
                  </Row>
                )) ||
                (specificCategory === "gender" && (
                  <Row>
                    <h4>{`Best Rated ${specificValue} Eyeglasses`}</h4>
                    {products
                      .filter(
                        (product) => product.gender === `${specificValue}`
                      )
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 5)
                      .map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                          <Product product={product} />
                        </Col>
                      ))}
                  </Row>
                )))}

            {type === "specific" &&
              ((specificCategory === "brand" && (
                <Row>
                  <h4>{`All ${specificValue} Eyeglasses`}</h4>
                  {products
                    .filter((product) => product.brand === `${specificValue}`)
                    .map((product) => (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                        <Product product={product} />
                      </Col>
                    ))}
                </Row>
              )) ||
                (specificCategory === "shape" && (
                  <Row>
                    <h4>{`All ${specificValue} Eyeglasses`}</h4>
                    {products
                      .filter((product) => product.shape === `${specificValue}`)
                      .map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                          <Product product={product} />
                        </Col>
                      ))}
                  </Row>
                )) ||
                (specificCategory === "gender" && (
                  <Row>
                    <h4>{`All ${specificValue} Eyeglasses`}</h4>
                    {products
                      .filter(
                        (product) => product.gender === `${specificValue}`
                      )
                      .map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                          <Product product={product} />
                        </Col>
                      ))}
                  </Row>
                )))}

            {type === "Filter" && (
              <Row>
                <h4>Filtered Eyeglasses</h4>
                {filterProducts(products, FilteredValues).map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                    <Product product={product} />
                  </Col>
                ))}
                {filterProducts(products, FilteredValues).length === 0 && (
                  <h1>Sorry, No product Found</h1>
                )}
              </Row>
            )}
            <hr></hr>
          </Container>
        </>
      )}
    </>
  );
};

export default SpecScreen;
