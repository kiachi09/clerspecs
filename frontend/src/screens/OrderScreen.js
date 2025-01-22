import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import PrescriptionImage from "../components/PrescriptionImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Accordion,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log("here is the user info", userInfo);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  console.log("here is the order comrade", order);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    dispatch(listProducts());

    // to integrate with payu see the video https://www.youtube.com/watch?v=aVRnx1YYpDc for integration and payu docs

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, userInfo, history]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult))
      .then(() => {
        toast.success("Paid successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error While Paying. Please try again.");
      });
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
      .then(() => {
        toast.success("Updated to delivered successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error While Updating. Please try again.");
      });
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <ToastContainer />
      <h1 style={{ marginTop: "5rem" }}>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.pincode},{order.shippingAddress.state},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}{" "}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt} </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          Product Price - {item.quantity} x ₹{item.price} = ₹
                          {item.quantity * item.price}
                        </Col>
                        {item.lensprice === 0 ? null : (
                          <Col md={4}>
                            LensPrice -{item.quantity} x ${item.lensprice} = $
                            {item.quantity * item.lensprice}
                          </Col>
                        )}
                      </Row>
                      {item.onlyFrame === "false" && (
                        <div>
                          {item.lens &&
                          products.some((product) => product._id === item.lens)
                            ? products
                                .filter((product) => product._id === item.lens)
                                .map((filteredProduct) => (
                                  <Row key={filteredProduct._id}>
                                    <Col md={2}>
                                      <Image
                                        src={filteredProduct.image}
                                        alt={filteredProduct.name}
                                        fluid
                                        rounded
                                      />
                                    </Col>
                                    <Col md={4}>
                                      Lens Name - {filteredProduct.name}
                                    </Col>
                                  </Row>
                                ))
                            : null}
                          <Row>
                            <Col>
                              <Accordion>
                                <Accordion.Item eventKey='0'>
                                  <Accordion.Header>
                                    Lens Details
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    <Table responsive='xl'>
                                      <thead>
                                        <tr>
                                          <th
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            od_sph
                                          </th>
                                          <th
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            od_cyl
                                          </th>
                                          <th
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            od_axis
                                          </th>
                                          <th
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            os_sph
                                          </th>
                                          <th
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            os_cyl
                                          </th>
                                          <th
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            os_axis
                                          </th>
                                          <th
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            Add Power
                                          </th>
                                          <th
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            pd_value
                                          </th>
                                          <th
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            pd_type
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td
                                            className='text-center'
                                            style={{
                                              verticalAlign: "middle",
                                              wordWrap: "break-word",
                                            }}
                                          >
                                            {item.manualValues[0].od_sph}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{
                                              verticalAlign: "middle",
                                              wordWrap: "break-word",
                                            }}
                                          >
                                            {item.manualValues[0].od_cyl}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues[0].od_axis}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues[0].os_sph}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues[0].os_cyl}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues[0].os_axis}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues[0].Add_Power}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues[0].pd_type}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues[0].pd_value}
                                          </td>
                                        </tr>

                                        {item.manualValues[0].PrescriptionImage.trim() !==
                                          "" && (
                                          <tr>
                                            <td colSpan={12}>
                                              <PrescriptionImage
                                                data={
                                                  item.manualValues[0]
                                                    .PrescriptionImage
                                                }
                                              />
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </Table>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              {order.lensPrice === 0 ? null : (
                <ListGroup.Item>
                  <Row>
                    <Col>Lens</Col>
                    <Col>₹{order.lensPrice}</Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              {order.appliedOffer.appliedOfferId === null ? null : (
                <ListGroup.Item>
                  <Row>
                    <Col>Discount</Col>
                    <Col>${order.discountPrice}</Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
