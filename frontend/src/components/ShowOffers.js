import React from "react";
import { useState } from "react";
import { Modal, Button, Row, Col, Badge } from "react-bootstrap";

const ShowOffers = ({ offers }) => {
  console.log(offers);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {offers === undefined ? null : (
        <>
          <Button variant='primary' onClick={handleShow}>
            See Offer Used
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Offers Taken</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className='text-center'>
                <Col md={6}>OfferId</Col>
                <Col md={6}>OfferValue</Col>
              </Row>
              {offers.map((offer, index) => (
                <Row key={index} className='text-center'>
                  <Col md={6}>
                    {" "}
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
                      {offer.appliedOfferId}
                    </Badge>
                  </Col>
                  <Col md={6}>
                    {" "}
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
                      {offer.appliedOfferValue}
                    </Badge>
                  </Col>
                </Row>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default ShowOffers;
