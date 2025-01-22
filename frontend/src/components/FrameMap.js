import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, Modal, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function FrameMap({ frameIds, setFrameIds }) {
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
  const handleFrameLensSelection = (e) => {
    const selectedFrameId = e.target.value;
    if (e.target.checked) {
      setFrameIds([...frameIds, selectedFrameId]);
    } else {
      setFrameIds(frameIds.filter((id) => id !== selectedFrameId));
    }
  };

  console.log(frameIds);

  return (
    <>
      <Button
        className='shadow rounded ms-2'
        type='button'
        onClick={handleShow}
      >
        Choose Frames Lens
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
            <Modal.Title>Choose the Frame Lens</Modal.Title>
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
                      .filter((product) => product.category === "Framelens")
                      .map((frame) => (
                        <Form.Check
                          key={frame._id}
                          type='checkbox'
                          id={`frame-${frame._id}`}
                          label={frame.name}
                          value={frame._id}
                          onChange={handleFrameLensSelection}
                          checked={frameIds.includes(frame._id)}
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

export default FrameMap;
