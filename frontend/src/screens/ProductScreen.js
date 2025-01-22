import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import SizeGuide from "../components/SizeGuideModal";
import PincodeChecker from "../components/PincodeChecker";
import ReactImageMagnify from "react-image-magnify";
// import duty2 from "../../staticuploads/ScreenPic9.jpg";

import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Form,
  ListGroupItem,
  Badge,
  Table,
  Image,
} from "react-bootstrap";
import Rating from "../components/Rating";
import FormLensModal from "../components/FormLensModal";
import SimilarProducts from "../components/SimilarProducts";
import ContactlensModal from "../components/ContactlensModal";

import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const [type, setType] = useState("2");
  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");
  const [Specification, setSpecification] = useState({
    onlyFrame: false,
    qty: 1,
    // frame: "",
    prescriptionType: " ",
    lens: " ",
    lensprice: 0,
    ManualValues: {
      od_sph: 0,
      od_cyl: 0,
      od_axis: 0,
      os_sph: 0,
      os_cyl: 0,
      os_axis: 0,
      Add_Power: 0,
      pd_type: " ",
      pd_value: 0,
      PrescriptionImage: " ",
    },
  });

  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  // console.log("here is the", product);
  // console.log("here is the", product.OffersIds);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const SpecTable = [
    { column1: "Frame Material", column2: "Value 2" },
    { column1: "Lens Material", column2: "Value 5" },
    { column1: "Shape", column2: "Value 5" },
    { column1: "Country of Origin", column2: "Value 5" },
    { column1: "Manufactured by", column2: "Value 5" },
    { column1: "SKUID", column2: "Value 5" },
    { column1: "Dimensions(in mm)", column2: "Value 5" },

    // Add more rows as needed
  ];

  const featTable = [
    "Glossy Full Frame ",
    "Light Weight and Comfortable",
    "Strong and Durabl",
    "Free Eyeglasses Case with Cleaning Cloth",
  ];

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productCreateReview;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, product._id, successProductReview]);

  const addToCartHandler = () => {
    // console.log("here is the latest", Specification);
    // if (Specification.onlyFrame) {
    //   history.push(
    //     `/cart/${match.params.id}/${Specification.onlyFrame}?qty=${Specification.qty}`
    //   );
    // } else {
    history.push(
      `/cart/${match.params.id}/${Specification.onlyFrame}/${Specification.lens}/${Specification.lensprice}/${Specification.prescriptionType}/${Specification.ManualValues.od_sph}/${Specification.ManualValues.od_cyl}/${Specification.ManualValues.od_axis}/${Specification.ManualValues.os_sph}/${Specification.ManualValues.os_cyl}/${Specification.ManualValues.os_axis}/${Specification.ManualValues.Add_Power}/${Specification.ManualValues.pd_type}/${Specification.ManualValues.pd_value}/${Specification.ManualValues.PrescriptionImage}?qty=${Specification.qty}`
    );

    setSpecification({
      ...Specification,
      qty: 1,
      onlyFrame: false,
      // frame: "",
      lensprice: 0,
      prescriptionType: " ",
      lens: " ",
      ManualValues: {
        od_sph: 0,
        od_cyl: 0,
        od_axis: 0,
        os_sph: 0,
        os_cyl: 0,
        os_axis: 0,
        pd_type: " ",
        pd_value: 0,
        PrescriptionImage: " ",
      },
    });
    setType("2");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  const handleExpand1 = () => {
    setExpanded1(!expanded1);
  };
  const handleExpand2 = () => {
    setExpanded2(!expanded2);
  };
  const handleExpand3 = () => {
    setExpanded3(!expanded3);
  };

  return (
    <>
      {product.category === "Eyeglasses" && (
        <Link
          className='btn btn-light my -1'
          to='/specs'
          style={{ marginTop: "5rem" }}
        >
          Go Back
        </Link>
      )}
      {product.category === "Sunglasses" && (
        <Link
          className='btn btn-light my -1'
          to='/goggles'
          style={{ marginTop: "5rem" }}
        >
          Go Back
        </Link>
      )}
      {product.category === "Contactlens" && (
        <Link
          className='btn btn-light my -1'
          to='/Contactlens'
          style={{ marginTop: "5rem" }}
        >
          Go Back
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />

          <Row>
            <Col md={6}>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.name,
                    isFluidWidth: true,
                    src: product.image,
                  },
                  largeImage: {
                    src: product.image,
                    width: 800,
                    height: 800,
                  },
                  enlargedImageContainerStyle: {
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px ",
                    borderRadius: "100px",
                  },
                  enlargedImagePosition: "over",
                }}
              />
            </Col>

            <Col md={{ span: 4, offset: 2 }}>
              <ListGroup variant='flush'>
                <ListGroup.Item className='text-center'>
                  <h3 className='my-2'>
                    <span style={{ fontWeight: "bold" }}>{product.name}</span>
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Badge
                    size='lg'
                    className='my-2 badge-lg'
                    style={{
                      borderRadius: "100px",
                      backgroundImage:
                        "linear-gradient(to left, transparent, #6DDEFF, transparent)",
                      backgroundSize: "200% 200%",
                      boxShadow:
                        "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",

                      animation: "shine 3s infinite",
                    }}
                  >
                    <i
                      style={{
                        color: "white",
                      }}
                      className='mx-1 fa-solid fa-fire-flame-curved'
                    ></i>
                    {product.soldSoFar >= product.numReviews + 100
                      ? `Sold So Far- ${product.soldSoFar}`
                      : `Sold So Far- ${product.numReviews + 100}`}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Rating
                        className='my-2 '
                        color='#009FE5'
                        value={product.rating}
                      />
                    </Col>
                    <Col> {product.numReviews} reviews </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Brand:</Col>
                    <Col>{product.brand}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock === 0 ? (
                        <Badge
                          pill
                          bg='danger'
                          style={{
                            padding: "0.75rem",
                            animation: "zoominout 1s 3 ",
                          }}
                        >
                          Out of Stock
                        </Badge>
                      ) : product.countInStock < 10 ? (
                        <Badge
                          pill
                          bg='warning'
                          style={{
                            padding: "0.75rem",
                            animation: "zoominout 1s 20 ",
                          }}
                        >
                          Very Few Left
                        </Badge>
                      ) : product.countInStock >= 10 ? (
                        <Badge
                          pill
                          bg=''
                          style={{
                            padding: "0.75rem",
                            animation: "zoominout 1s 5 ",
                            backgroundColor: "#2f99d1",
                          }}
                        >
                          Available
                        </Badge>
                      ) : null}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroupItem
                  className='mt-3'
                  style={{
                    borderTop: "1.5px solid  #2f99d1",
                    borderBottom: "1.5px solid  #2f99d1",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "100%",
                      position: "absolute",
                      top: "-0.75rem",
                      left: "2.25rem",
                      backgroundColor: "white",
                      color: " #2f99d1",
                      padding: "0px",
                    }}
                  >
                    {product.OffersIds
                      ? "Offers available"
                      : "Offers Unavailable"}
                  </div>

                  <Row>
                    <Col>
                      <i
                        style={{ color: "#2f99d1" }}
                        class='fa-solid fa-tags'
                      ></i>
                      {product.OffersIds
                        ? "Apply Coupon at Checkout to avail Discount."
                        : "Apply Coupon at Checkout If Any."}
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem className='my-2'>
                  {product.category === "Contactlens" ? (
                    <ContactlensModal
                      type={type}
                      setType={setType}
                      product={product}
                      Specification={Specification}
                      setSpecification={setSpecification}
                      addToCartHandler={addToCartHandler}
                    />
                  ) : (
                    <FormLensModal
                      type={type}
                      setType={setType}
                      product={product}
                      Specification={Specification}
                      setSpecification={setSpecification}
                      addToCartHandler={addToCartHandler}
                    />
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className='my-3' md={6}>
              <ListGroup variant='flush' classname=''>
                <ListGroup.Item className=' d-flex justify-content-between align-items-start'>
                  <div className=''>
                    <div className='fw-bold'>Description</div>
                    <div
                      className={`item-content-product ${
                        expanded3 ? "expand" : ""
                      }`}
                    >
                      {product.description}
                    </div>
                  </div>
                  <button
                    style={{
                      border: "0.1px solid white",
                    }}
                    onClick={handleExpand3}
                  >
                    {expanded3 ? (
                      <i class='rotated-icon fa-solid fa-chevron-down'></i>
                    ) : (
                      <i class='fa-solid fa-chevron-down'></i>
                    )}
                  </button>
                </ListGroup.Item>
                <ListGroup.Item className=' d-flex justify-content-between align-items-start'>
                  <div className=''>
                    <div className=''>Features</div>
                    <div
                      className={`item-content-product ${
                        expanded1 ? "expand" : ""
                      }`}
                    >
                      <ListGroup variant='flush'>
                        {featTable.map((feature, index) => (
                          <ListGroup.Item key={index}>
                            <i
                              style={{
                                color: "#2f99d1",
                              }}
                              class='fa-solid fa-square-check'
                            ></i>{" "}
                            {feature}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  </div>
                  <button
                    style={{
                      border: "0.1px solid white",
                    }}
                    onClick={handleExpand1}
                  >
                    {expanded1 ? (
                      <i class='rotated-icon fa-solid fa-chevron-down'></i>
                    ) : (
                      <i class='fa-solid fa-chevron-down'></i>
                    )}
                  </button>
                </ListGroup.Item>
                <ListGroup.Item className=' d-flex justify-content-between align-items-start'>
                  <div className=''>
                    <div className='fw-bold'>Specifications</div>
                    <div
                      className={`item-content-product ${
                        expanded2 ? "expand" : ""
                      }`}
                    >
                      <Table striped bordered hover>
                        <tbody>
                          {SpecTable.map((row, index) => (
                            <tr key={index}>
                              <td>{row.column1}</td>
                              <td>{row.column2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  <button
                    style={{
                      border: "0.1px solid white",
                    }}
                    onClick={handleExpand2}
                  >
                    {expanded2 ? (
                      <i class='rotated-icon fa-solid fa-chevron-down'></i>
                    ) : (
                      <i class='fa-solid fa-chevron-down'></i>
                    )}
                  </button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <ListGroup variant='flush'>
                <ListGroupItem></ListGroupItem>
                <ListGroupItem className='text-center'>
                  <SizeGuide product={product} />
                </ListGroupItem>
                <ListGroupItem className='mt-3'>
                  <PincodeChecker />
                </ListGroupItem>
                <ListGroupItem className='mt-3'>
                  <Image src='../../staticuploads/ScreenPic9.jpg' fluid />
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>

          <Row>
            {/* {product.similarIds} */}
            <SimilarProducts similarIds={product.similarIds} />
          </Row>

          <Row>
            <Col md={12}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
