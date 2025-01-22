import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const productisonlyFrame = match.params.onlyFrame;
  // const productframe = match.params.frame;
  const productlens = match.params.lens;
  const productlensprice = match.params.lensprice;

  const productprescriptionType = match.params.prescriptionType;
  const productmanualValues = {
    od_sph: match.params.od_sph,
    od_cyl: match.params.od_cyl,
    od_axis: match.params.od_axis,
    os_sph: match.params.os_sph,
    os_cyl: match.params.os_cyl,
    os_axis: match.params.os_axis,
    pd_type: match.params.pd_type,
    pd_value: match.params.pd_value,
    Add_Power: match.params.Add_Power,
    PrescriptionImage: match.params.PrescriptionImage,
  };

  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(
        addToCart(
          productId,
          quantity,
          productisonlyFrame,
          productlens,
          productlensprice,
          productprescriptionType,
          productmanualValues
        )
      )
        .then(() => {
          toast.success("Added to Cart successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error Adding product. Please try again.");
        });
    }
  }, [
    dispatch,
    productId,
    quantity,
    productisonlyFrame,
    productlens,

    productprescriptionType,
  ]);

  const removeFromCartHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(removeFromCart(id));
    }
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      <ToastContainer />
      <Row style={{ marginTop: "5rem" }}>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          <div>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty<Link to='/'>Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={2}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>ProductPrice - ${item.price}</Col>
                      <Col md={2}>LensPrice - ${item.lensprice}</Col>

                      <Col md={2}>
                        <Form.Control
                          as='select'
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              addToCart(
                                item.product,
                                Number(e.target.value),
                                item.onlyFrame,
                                item.lens,
                                item.lensprice,
                                item.prescriptionType,
                                item.manualValues
                              )
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type='button'
                          variant='light'
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                    items
                  </h2>
                </Row>
                <Row>
                  {" "}
                  <Col md={6}> Total Product Price</Col>
                  <Col md={6}>
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </Col>
                </Row>
                <Row>
                  {" "}
                  <Col md={6}> Total Lens Price</Col>
                  <Col md={6}>
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.lensprice,
                        0
                      )
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
