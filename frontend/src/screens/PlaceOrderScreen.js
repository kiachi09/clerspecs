import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PrescriptionImage from "../components/PrescriptionImage";

import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Accordion,
  Table,
  Form,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import ApplyOffer from "../components/ApplyOffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrder } from "../actions/orderActions";
import { listProducts } from "../actions/productActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const cart = useSelector((state) => state.cart);
  console.log("here is the cart", cart);

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }

  // const orderCart = {};

  const [orderCart, setOrderCart] = useState({
    lensPrice: 0,
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    discountPrice: 0,
    totalPrice: 0,
    appliedOffer: {
      appliedOfferId: null,
      appliedOfferValue: 0,
    },
  });

  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");
  const [couponCodeInput, setCouponCodeInput] = useState(false);

  const applyCoupon = () => {
    setCouponCodeInput(true);
    setMessage("Invalid coupon code entered");
  };
  const clearCoupon = () => {
    setCouponCode("");
    setCouponCodeInput(false);
    setMessage("");
  };
  // Calculate prices
  const addDecimals = (num) => {
    return Number((Math.round(num * 100) / 100).toFixed(2));
  };
  // orderCart.itemsPrice = addDecimals(
  //   cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  // );
  // orderCart.lensPrice = addDecimals(
  //   cart.cartItems.reduce(
  //     (acc, item) => acc + item.lensprice * item.quantity,
  //     0
  //   )
  // );

  // orderCart.shippingPrice = addDecimals(orderCart.itemsPrice > 100 ? 0 : 10);
  // // here we can add if price less than 100 then charge if greater then no charge

  // orderCart.taxPrice = addDecimals(
  //   Number((0.15 * orderCart.itemsPrice).toFixed(2))
  // );

  // // taxable about change kar denge zitna gst hai utna daal denge

  // orderCart.totalPrice = (
  //   Number(orderCart.itemsPrice) +
  //   Number(orderCart.lensPrice) +
  //   Number(orderCart.shippingPrice) +
  //   Number(orderCart.taxPrice)
  // ).toFixed(2);

  const [allOfferIds, setAllOfferIds] = useState([]);

  const accessCartData = async (cart) => {
    let uniqueOfferIds = new Set();
    // Iterate through the cartItems array in the cart
    for (const item of cart.cartItems) {
      try {
        // Find the product in the Products object using the product ID
        const product = await products.find((p) => p._id === item.product);

        // console.log("the product retreived", product);
        // Extract the OffersIds and add them to the uniqueOfferIds set
        for (const offerId of product.OffersIds) {
          uniqueOfferIds.add(offerId.toString());
        }
      } catch (error) {
        console.error(
          `Error retrieving product with ID: ${item.product}`,
          error
        );
      }
    }
    const allOfferIds = Array.from(uniqueOfferIds);
    setAllOfferIds(allOfferIds);
  };

  const calculateOrderCart = (cart) => {
    const itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    const lensPrice = addDecimals(
      cart.cartItems.reduce(
        (acc, item) => acc + item.lensprice * item.quantity,
        0
      )
    );
    const shippingPrice = addDecimals(
      Number((itemsPrice > 100 ? 0 : 10).toFixed(2))
    );
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    const discountPrice = addDecimals(Number((0).toFixed(2)));
    const totalPrice = (
      Number(itemsPrice) +
      Number(lensPrice) +
      Number(shippingPrice) +
      Number(taxPrice) -
      Number(discountPrice)
    ).toFixed(2);

    // setOrderCart({
    //   itemsPrice,
    //   lensPrice,
    //   shippingPrice,
    //   taxPrice,
    //   discountPrice,
    //   totalPrice,
    // });
    setOrderCart((prevCart) => ({
      ...prevCart,
      itemsPrice: itemsPrice,
      lensPrice: lensPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      discountPrice: discountPrice,
      totalPrice: totalPrice,
    }));
  };

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    dispatch(listProducts());
    calculateOrderCart(cart);
    accessCartData(cart);

    if (success) {
      history.push(`/order/${order._id}`);
      toast.success("Order placed successfully!");
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: orderCart.itemsPrice,
        shippingPrice: orderCart.shippingPrice,
        taxPrice: orderCart.taxPrice,
        lensPrice: orderCart.lensPrice,
        discountPrice: orderCart.discountPrice,
        totalPrice: orderCart.totalPrice,
        appliedOffer: orderCart.appliedOffer,
      })
    );
  };

  return (
    <>
      <ToastContainer />
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address} {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.pincode}, {cart.shippingAddress.state},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          ProductPrice -{item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </Col>
                        {item.lensprice === "0" ? null : (
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
                                            Add_Power
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
                                            {item.manualValues.od_sph}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{
                                              verticalAlign: "middle",
                                              wordWrap: "break-word",
                                            }}
                                          >
                                            {item.manualValues.od_cyl}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues.od_axis}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues.os_sph}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues.os_cyl}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues.os_axis}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues.Add_Power}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues.pd_type}
                                          </td>
                                          <td
                                            className='text-center'
                                            style={{ verticalAlign: "middle" }}
                                          >
                                            {item.manualValues.pd_value}
                                          </td>
                                        </tr>

                                        {item.manualValues.PrescriptionImage.trim() !==
                                          "" && (
                                          <tr>
                                            <td colSpan={12}>
                                              <PrescriptionImage
                                                data={
                                                  item.manualValues
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
                  <Col>${orderCart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              {orderCart.lensPrice === 0 ? null : (
                <ListGroup.Item>
                  <Row>
                    <Col>Lens</Col>
                    <Col>${orderCart.lensPrice}</Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderCart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderCart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Discount</Col>
                  <Col>${orderCart.discountPrice}</Col>
                </Row>
              </ListGroup.Item>
              {allOfferIds.length > 0 ? (
                <ListGroup.Item>
                  {orderCart.appliedOffer.appliedOfferId === null && (
                    <div className=' align-items-center justify-content-center rounded'>
                      <InputGroup
                        className='mb-3 gap-1'
                        style={{ width: "100%", borderRadius: "20px" }}
                      >
                        <Form.Control
                          type='text'
                          style={{ borderRadius: "20px" }}
                          placeholder='Type coupon code here'
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        {couponCodeInput === false ? (
                          <Button
                            style={{ borderRadius: "20px" }}
                            className='p-2'
                            variant='outline-primary'
                            onClick={applyCoupon}
                          >
                            Apply
                          </Button>
                        ) : (
                          <Button
                            variant='outline-danger'
                            style={{ borderRadius: "20px", marginLeft: "5px" }}
                            onClick={clearCoupon}
                          >
                            ✖
                          </Button>
                        )}
                      </InputGroup>
                      {message && (
                        <Alert
                          style={{ borderRadius: "20px" }}
                          variant='danger'
                        >
                          {message}
                        </Alert>
                      )}
                    </div>
                  )}

                  <Row>
                    <ApplyOffer
                      products={products}
                      orderCart={orderCart}
                      allOfferIds={allOfferIds}
                      setOrderCart={setOrderCart}
                    />
                  </Row>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Row>
                    <Col className='text-center'>No Offer</Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderCart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  style={{ borderRadius: "20px" }}
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
