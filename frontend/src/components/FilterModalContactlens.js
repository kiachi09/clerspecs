import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  Modal,
  Container,
  Accordion,
} from "react-bootstrap";
// import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
// import RangeSlider from "react-bootstrap-range-slider";

function FilterModalContactlens({
  setType,
  setFilteredValues,
  FilteredValues,
  products,
  type,
  Existingvalue,
}) {
  let category, value;
  if (Existingvalue.params.value) {
    [category, value] = Existingvalue.params.value.split("-");
  }

  const [show, setShow] = useState(false);

  const [Brand, setBrand] = useState(category === "brand" ? value : "");
  const [PriceRange, setPriceRange] = useState(0);
  const [Colour, setColour] = useState(category === "colour" ? value : "");
  const [Usage, setUsage] = useState(category === "usage" ? value : "");
  const handleClose = () => {
    setShow(false);
    setBrand("");
    setColour("");
    setPriceRange(0);
    setUsage("");
  };
  const removeFilter = () => {
    setType(Existingvalue.params.value ? "specific" : "All");
    setBrand(category === "brand" ? value : "");
    setColour(category === "colour" ? value : "");
    setPriceRange(0);
    setUsage(category === "usage" ? value : "");
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSaveClose = (e) => {
    e.preventDefault();
    setFilteredValues({
      PriceRange: PriceRange,
      brand: Brand,
      colour: Colour,
      usage: Usage,
    });
    setShow(false);
    setType("Filter");
  };
  return (
    <>
      {type === "Filter" ? (
        <Button
          style={{ backgroundColor: "#2F99D1" }}
          className='shadow primary rounded'
          type='button'
          onClick={removeFilter}
        >
          <i className='fa-solid fa-check fa-bounce'></i>Applied
        </Button>
      ) : (
        <Button
          className='shadow btn-light rounded'
          type='button'
          onClick={handleShow}
        >
          <i className='fa-solid fa-filter'></i>FILTER
        </Button>
      )}
      <Container>
        <Modal
          animation
          backdrop='static'
          show={show}
          size='lg'
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Filter To Your Needs</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Group>
                {Existingvalue.params.value && category === "colour" ? (
                  <Row className='mb-3'>
                    <Form.Label as='legend'>Colour</Form.Label>
                    <Col>
                      <Form.Control
                        size='lg'
                        type='text'
                        placeholder={value}
                        disabled
                      />
                    </Col>
                  </Row>
                ) : (
                  <Row className='mb-3'>
                    <Form.Label as='legend'>Choose Colour</Form.Label>
                    <Col>
                      <Form.Select onChange={(e) => setColour(e.target.value)}>
                        <option value='' hidden>
                          Select
                        </option>
                        {[
                          ...new Set(products.map((product) => product.colour)),
                        ].map((colour, index) => (
                          <option key={index} value={colour}>
                            {colour}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                )}

                <Row>
                  <Accordion>
                    <Accordion.Header>
                      <h4>
                        <strong>Choose Price Range</strong>
                      </h4>
                    </Accordion.Header>

                    <Accordion.Body>
                      <Col>
                        {["radio"].map((type) => (
                          <div
                            key={`inline-${type}`}
                            style={{
                              backgroundColor: "#d9d9d9",
                              marginBottom: "3px",
                            }}
                            className='mb-3'
                          >
                            <Form.Check
                              label='$0 - $100'
                              value={1}
                              name='group1'
                              type={type}
                              id={`inline-${type}-1`}
                              onChange={(e) => setPriceRange(e.target.value)}
                            />
                            <Form.Check
                              label='$100 - $200'
                              value={2}
                              name='group1'
                              type={type}
                              id={`inline-${type}-2`}
                              onChange={(e) => setPriceRange(e.target.value)}
                            />
                            <Form.Check
                              label='$200 - $300'
                              value={3}
                              name='group1'
                              type={type}
                              id={`inline-${type}-2`}
                              onChange={(e) => setPriceRange(e.target.value)}
                            />
                            <Form.Check
                              label='$300 - $400'
                              value={4}
                              name='group1'
                              type={type}
                              id={`inline-${type}-2`}
                              onChange={(e) => setPriceRange(e.target.value)}
                            />
                            <Form.Check
                              label='$400 - $500'
                              value={5}
                              name='group1'
                              type={type}
                              id={`inline-${type}-2`}
                              onChange={(e) => setPriceRange(e.target.value)}
                            />
                            <Form.Check
                              label='$500+'
                              value={6}
                              name='group1'
                              type={type}
                              id={`inline-${type}-2`}
                              onChange={(e) => setPriceRange(e.target.value)}
                            />
                          </div>
                        ))}
                      </Col>
                    </Accordion.Body>
                  </Accordion>
                </Row>

                {Existingvalue.params.value && category === "usage" ? (
                  <Row className='mb-3'>
                    <Form.Label as='legend'>Usage</Form.Label>
                    <Col>
                      <Form.Control
                        size='lg'
                        type='text'
                        placeholder={value}
                        disabled
                      />
                    </Col>
                  </Row>
                ) : (
                  <Row className='mb-3'>
                    <Form.Label as='legend'>Choose Usage</Form.Label>
                    <Col>
                      <Form.Select onChange={(e) => setUsage(e.target.value)}>
                        <option value='' hidden>
                          Select
                        </option>
                        {[
                          ...new Set(products.map((product) => product.usage)),
                        ].map((usage, index) => (
                          <option key={index} value={usage}>
                            {usage}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                )}

                {Existingvalue.params.value && category === "brand" ? (
                  <Row className='mb-3'>
                    <Form.Label as='legend'>Brand</Form.Label>
                    <Col>
                      <Form.Control
                        size='lg'
                        type='text'
                        placeholder={value}
                        disabled
                      />
                    </Col>
                  </Row>
                ) : (
                  <Row className='mb-3'>
                    <Form.Label as='legend'> Choose Brand</Form.Label>
                    <Col>
                      <Form.Select onChange={(e) => setBrand(e.target.value)}>
                        <option value='' hidden>
                          Select
                        </option>
                        {[
                          ...new Set(products.map((product) => product.brand)),
                        ].map((brand, index) => (
                          <option key={index} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                )}
              </Form.Group>
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

export default FilterModalContactlens;
