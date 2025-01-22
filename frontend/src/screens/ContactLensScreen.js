import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import FilterModalContactlens from "../components/FilterModalContactlens";
import { Row, Col, Button, Container } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import InfiniteScroll from "react-infinite-scroll-component";

// import Cover from "../../staticuploads/ScreenPic6.jpg";

import Meta from "../components/Meta";

import { useDispatch, useSelector } from "react-redux";
import { ContactlensProducts } from "../actions/productActions";

function ContactlensScreen({ match, history }) {
  // const backgroundRef = useRef(null);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const threeMothsAgo = new Date();
  threeMothsAgo.setMonth(threeMothsAgo.getMonth() - 3);
  const timestamp = threeMothsAgo.toISOString();
  const [type, setType] = useState("");
  const [FilteredValues, setFilteredValues] = useState([]);
  const [specificCategory, setspecificCategory] = useState("");
  const [specificValue, setspecificValue] = useState("");
  const dispatch = useDispatch();
  const productContactlensList = useSelector(
    (state) => state.productContactlensList
  );
  const { loading, error, products } = productContactlensList;

  const loadMore = () => {
    setTimeout(() => {
      // Simulate loading delay with setTimeout
      setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 12); // Increment the number of visible products
    }, 1000); // Wait for 2 seconds before loading more products
  };

  const filterProducts = (products, FilteredValues) => {
    const { PriceRange, brand, usage, colour } = FilteredValues;

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

      if (colour && product.colour !== colour) {
        return false;
      }

      if (usage && product.usage !== usage) {
        return false;
      }

      return true;
    });
  };

  useEffect(() => {
    dispatch(ContactlensProducts());
    if (match && match.params && match.params.value) {
      const data = match.params.value.split("-");
      setspecificCategory(data[0]);
      setspecificValue(data[1]);
      setType("specific");
    } else {
      setType("All");
    }
    // const handleScroll = () => {
    //   const scrollPosition = window.pageYOffset;
    //   const maxScroll =
    //     document.documentElement.scrollHeight -
    //     document.documentElement.clientHeight;
    //   const scale = 1 + scrollPosition / (maxScroll * 2);
    //   const translateY = scrollPosition * 0.75; // Adjust the value for desired parallax intensity
    //   backgroundRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    // };

    // window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
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
          <Row>
            <Col md={12}>
              <div
                className=' position-relative bg-image bg-overlay-60'
                style={{
                  backgroundImage: `url("../../staticuploads/ScreenPic6.jpg")`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  animation: " moveBackground 10s ease-in-out infinite",
                  transformOrigin: "center center",
                }}
              >
                <Row>
                  <Col md={{ span: 3, offset: 1 }}>
                    <div
                      style={{ textAlign: "center", marginTop: "5rem" }}
                      className=' position-relative z-index-1 '
                    >
                      <h1
                        style={{ textAlign: "justify" }}
                        className='display-4  text-white'
                      >
                        Find The{" "}
                        <strong style={{ color: "#ffff03" }}>Best </strong>
                        <strong style={{ color: "#2f99d1" }}>Contact </strong>
                        Lens For
                        <strong style={{ color: "green" }}> Yourself </strong>
                        <strong style={{ color: "red" }}> Now </strong>
                      </h1>
                      <Button
                        className='mt-1 mb-5 shadow rounded'
                        // href='#pro'
                        type='Button'
                        onClick={() => history.push(`/Contactlens`)}
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
                  {`All ${specificValue} Contactlens`}
                </Button>
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
                    {`Best Rated ${specificValue} Contactlens`}
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
              <FilterModalContactlens
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
              //   <h4>Our Wide Range Of Contactlens</h4>
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
                  <h4>Our Wide Range Of Contactlens</h4>
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
                <h4>Popular Contactlens</h4>
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
                <h4>Newly Arrived Contactlens</h4>
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
                  <h4>{`Best Rated ${specificValue} Contactlens`}</h4>
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
                (specificCategory === "colour" && (
                  <Row>
                    <h4>{`Best Rated ${specificValue} Contactlens`}</h4>
                    {products
                      .filter(
                        (product) => product.colour === `${specificValue}`
                      )
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 5)
                      .map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                          <Product product={product} />
                        </Col>
                      ))}
                  </Row>
                )) ||
                (specificCategory === "usage" && (
                  <Row>
                    <h4>{`Best Rated ${specificValue} Contactlens`}</h4>
                    {products
                      .filter((product) => product.usage === `${specificValue}`)
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
                  <h4>{`All ${specificValue} Contactlens`}</h4>
                  {products
                    .filter((product) => product.brand === `${specificValue}`)
                    .map((product) => (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                        <Product product={product} />
                      </Col>
                    ))}
                </Row>
              )) ||
                (specificCategory === "usage" && (
                  <Row>
                    <h4>{`All ${specificValue} Contactlens`}</h4>
                    {products
                      .filter((product) => product.usage === `${specificValue}`)
                      .map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                          <Product product={product} />
                        </Col>
                      ))}
                  </Row>
                )) ||
                (specificCategory === "colour" && (
                  <Row>
                    <h4>{`All ${specificValue} Contactlens`}</h4>
                    {products
                      .filter(
                        (product) => product.colour === `${specificValue}`
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
                <h4>Filtered Contactlens</h4>
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
}
export default ContactlensScreen;
