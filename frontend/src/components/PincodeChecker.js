import React, { useState, useRef } from "react";
import { Row, Col, Alert, Button, Form } from "react-bootstrap";

const PincodeChecker = () => {
  const [validated, setValidated] = useState(false);
  const [pincode, setPincode] = useState("");
  const [serviceability, setServiceability] = useState(null);
  const formRef = useRef(null);

  const handleReset = () => {
    setPincode("");
    setServiceability(null);
    setValidated(false);
    const form = formRef.current;
    if (form) {
      form.reset();
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setServiceability(null);
    } else {
      const isServiceable = checkServiceability(pincode);
      setServiceability(isServiceable);
    }

    setValidated(true);
  };

  const checkServiceability = (pincode) => {
    // Implement your serviceability check logic here
    // Return true if the pincode is serviceable, false otherwise
    // You can make an API call or use any other method to check serviceability
    // For this example, let's assume the serviceability is based on a hardcoded list of serviceable pincodes
    const serviceablePincodes = [
      "123456",
      "678900",
      "500032",
      "834001",
      "345678",
    ];
    return serviceablePincodes.includes(pincode);
  };

  return (
    <Form
      ref={formRef}
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group controlId='pincode'>
        <Form.Label className='small'>
          Enter PIN code For Delivery Availability
        </Form.Label>
        <Row>
          <Col xs={9} className='pe-0'>
            <Form.Control
              style={{ borderRadius: "2.5rem" }}
              required
              type='text'
              placeholder='Enter PIN code'
              value={pincode}
              pattern='[0-9]{6}'
              onChange={(e) => setPincode(e.target.value)}
            />
            <Form.Control.Feedback type='valid'>
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              The value is Required and Should be Proper Pincode
            </Form.Control.Feedback>
          </Col>

          <Col xs={3} className='ps-2'>
            <Button
              style={{ border: "1px solid #2f99d1", borderRadius: "2.5rem" }}
              className='Psbutton shadow btn-light'
              type='submit'
            >
              Check
            </Button>
          </Col>
        </Row>
      </Form.Group>

      {serviceability !== null && (
        <Alert
          variant={serviceability ? "success" : "warning"}
          className='mt-2 d-flex justify-content-between align-items-center'
          style={{
            padding: "5px 10px",
            /* Add any other custom styles you want */
          }}
        >
          <span style={{ fontSize: "12px" }}>
            {serviceability ? "Serviceable" : "Not Serviceable"}
          </span>
          <Button variant='link' className='p-0' onClick={handleReset}>
            <i class='fa-regular fa-circle-xmark'></i>
          </Button>
        </Alert>
      )}
    </Form>
  );
};

export default PincodeChecker;
