import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import FilterModal from "../components/FilterModal";
import { Row, Col, Button, Container } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import Cover from "../../staticuploads/ScreenPic5.jpg";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import { goggleslistProducts } from "../actions/productActions";
import InfiniteScroll from "react-infinite-scroll-component";

const GogglesScreen = ({ match, history }) => {
  const threeMothsAgo = new Date();
  const [visibleProducts, setVisibleProducts] = useState(12);
  threeMothsAgo.setMonth(threeMothsAgo.getMonth() - 3);
  const timestamp = threeMothsAgo.toISOString();
  const dispatch = useDispatch();
  const productGogglesList = useSelector((state) => state.productGogglesList);
  const { loading, error, products } = productGogglesList;

  const [type, setType] = useState("");
  const [FilteredValues, setFilteredValues] = useState([]);
  const [specificCategory, setspecificCategory] = useState("");
  const [specificValue, setspecificValue] = useState("");

  useEffect(() => {
    dispatch(goggleslistProducts());
    if (match && match.params && match.params.value) {
      const data = match.params.value.split("-");
      setspecificCategory(data[0]);
      setspecificValue(data[1]);
      setType("specific");
    } else {
      setType("All");
    }
  }, [dispatch, match.params.value, match]);

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

  return (
    <>
      <Meta />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className=''>
            <Col md={12}>
              <div
                className=' position-relative bg-image bg-overlay-60'
                style={{
                  backgroundImage: `url("../../staticuploads/ScreenPic5.jpg")`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  animation: " moveBackground 10s ease-in-out",
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
                        ClersSpces's SunGlasses The{" "}
                        <strong style={{ color: "#1f48ff" }}>Strong </strong>The{" "}
                        <strong style={{ color: "#780630" }}>Free </strong>The{" "}
                        <strong style={{ color: "#27f57d" }}>Wild</strong>
                      </h1>
                      <Button
                        className='mt-1 mb-5 shadow rounded'
                        // href='#pro'
                        type='Button'
                        onClick={() => history.push(`/goggles`)}
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
                  {`All ${specificValue} Sunglasses`}
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
                    {`Best Rated ${specificValue} Sunglasses`}
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
              <InfiniteScroll
                dataLength={visibleProducts}
                next={loadMore}
                hasMore={visibleProducts > products.length ? false : true} // Set this to false if you don't have more products to load
                // loader={<Loader />} // Display a loading indicator while loading more products
              >
                <Row>
                  <h4>Our Wide Range Of Sunglasses</h4>
                  {products.slice(0, visibleProducts).map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
              </InfiniteScroll>
            )}
            {type === "Popular" && (
              <Row>
                <h4>Popular Sunglasses</h4>
                {products
                  .filter((product) => product.numReviews >= 2)
                  .map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                      <Product product={product} />
                    </Col>
                  ))}
              </Row>
            )}

            {type === "NewArrivals" && (
              <Row>
                <h4>Newly Arrived Sunglasses</h4>
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
                  <h4>{`Best Rated ${specificValue} Sunglasses`}</h4>
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
                    <h4>{`Best Rated ${specificValue} Sunglasses`}</h4>
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
                    <h4>{`Best Rated ${specificValue} Sunglasses`}</h4>
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
                  <h4>{`All ${specificValue} Sunglasses`}</h4>
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
                    <h4>{`All ${specificValue} Sunglasses`}</h4>
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
                    <h4>{`All ${specificValue} Sunglasses`}</h4>
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
                <h4>Filtered Sunglasses</h4>
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

export default GogglesScreen;
