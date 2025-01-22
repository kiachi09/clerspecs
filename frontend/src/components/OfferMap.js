import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, Modal, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function OfferMap({ offersIds, setOffersIds }) {
  console.log(offersIds);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleSaveClose = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleOfferLensSelection = (e) => {
    const selectedOfferId = e.target.value;
    if (e.target.checked) {
      setOffersIds([...offersIds, selectedOfferId]);
    } else {
      setOffersIds(offersIds.filter((id) => id !== selectedOfferId));
    }
  };

  return (
    <>
      <Button
        className='shadow rounded ms-2'
        type='button'
        onClick={handleShow}
      >
        Choose Offers
      </Button>
      <Container>
        <Modal
          animation
          backdrop='static'
          show={show}
          size='lg'
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Choose Offer for the Product</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Row style={{ backgroundColor: "#d9d9d9" }}>
                <Col
                  style={{
                    maxHeight: "500px", // Set the desired maximum height
                    overflow: "auto", // Enable scrolling if content exceeds the height
                    columnGap: "10px", // Adjust the gap between columns
                  }}
                >
                  <Form.Group>
                    {products
                      .filter((product) => product.category === "Offers")
                      .map((offer) => (
                        <Form.Check
                          key={offer._id}
                          type='checkbox'
                          id={`offer-${offer._id}`}
                          label={offer.offerName}
                          value={offer._id}
                          onChange={handleOfferLensSelection}
                          checked={offersIds.includes(offer._id)}
                        />
                      ))}
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button className='btn-dark rounded' onClick={handleClose}>
                Close
              </Button>
              <Button className='btn-dark rounded' onClick={handleSaveClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </>
  );
}

export default OfferMap;
