import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Offcanvas from "react-bootstrap/Offcanvas";
const ApplyOffer = ({ products, orderCart, allOfferIds, setOrderCart }) => {
  const [show, setShow] = useState(false);
  const addDecimals = (num) => {
    return Number((Math.round(num * 100) / 100).toFixed(2));
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleOfferSelect = (offerValue, appliedOffferId) => {
    const discount = addDecimals(
      Number(
        (
          (orderCart.lensPrice + orderCart.itemsPrice) *
          (offerValue / 100)
        ).toFixed(2)
      )
    );
    const total = addDecimals(
      Number(
        (
          orderCart.lensPrice +
          orderCart.itemsPrice +
          orderCart.shippingPrice +
          orderCart.taxPrice -
          discount
        ).toFixed(2)
      )
    );

    setOrderCart((prevCart) => ({
      ...prevCart,
      discountPrice: discount,
      totalPrice: total,
      appliedOffer: {
        appliedOfferId: appliedOffferId,
        appliedOfferValue: offerValue,
      },
    }));

    setShow(false);
  };

  const clearAppliedOffer = () => {
    setOrderCart((prevCart) => ({
      ...prevCart,
      discountPrice: 0,
      totalPrice: (
        prevCart.itemsPrice +
        prevCart.lensPrice +
        prevCart.shippingPrice +
        prevCart.taxPrice
      ).toFixed(2),
      appliedOffer: {
        appliedOfferId: null,
        appliedOfferValue: 0,
      },
    }));
  };

  console.log(orderCart);
  return (
    <>
      <Row>
        <Col
          md={orderCart.appliedOffer.appliedOfferId === null ? 12 : 10}
          className='align-self-center '
        >
          <Button
            variant='outline-primary'
            onClick={handleShow}
            className='pt-0 pb-0 '
            style={{
              display: "block",
              margin: "0 auto",

              height: "30px",
              width: "100%",
              borderRadius: "20px",
              animation:
                orderCart.appliedOffer.appliedOfferId === null
                  ? "none"
                  : "pulse 0.5s ease-in-out",
              transform:
                orderCart.appliedOffer.appliedOfferId === null
                  ? "none"
                  : "scale(1.0)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: "15px",
                animation:
                  orderCart.appliedOffer.appliedOfferId === null
                    ? "none"
                    : "bounce 0.5s ease-in-out",
              }}
            >
              {orderCart.appliedOffer.appliedOfferId === null
                ? "View all Coupons"
                : "Coupon Applied!"}
            </span>
          </Button>
        </Col>
        {orderCart.appliedOffer.appliedOfferId !== null && (
          <Col xs='auto' className='p-0'>
            <Button
              variant='outline-danger'
              style={{ marginLeft: "10px", borderRadius: "20px" }}
              onClick={clearAppliedOffer}
            >
              ✖
            </Button>
          </Col>
        )}
      </Row>

      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop='static'
        placement='end'
        className='custom-offcanvas my-1'
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <strong>Offers For You</strong>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {products
            .filter((product) => allOfferIds.includes(product._id))
            .map((product) => (
              <div key={product._id} className='custom-offcanvas-button my-2'>
                <Button
                  variant='primary'
                  onClick={() =>
                    handleOfferSelect(product.offerValue, product._id)
                  }
                >
                  {product.offerName}
                </Button>
                <p className='my-1'> {product.offerDesc}</p>
              </div>
            ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ApplyOffer;
