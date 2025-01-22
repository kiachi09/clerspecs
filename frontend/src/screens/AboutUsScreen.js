import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Alert } from "react-bootstrap";
import Loader from "../components/Loader";
import axios from "axios";
import Message from "../components/Message";

const AboutUsScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const validateEmail = (emailValue) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(emailValue);
    setIsValidEmail(isValid);
    return isValid;
  };
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    validateEmail(emailValue);
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/email/sendQuery", {
        email,
        message,
        name,
      });
      if (response) {
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error("Error generating Query:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        marginTop: "4rem",
      }}
    >
      <Row>
        <Col
          md={6}
          style={{
            paddingTop: "5rem",
            backgroundImage: `url("../../staticuploads/ScreenPic12.jpg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            paddingRight: "0rem",
            transformOrigin: "center center",
          }}
        >
          <h1
            style={{
              color: "white",
              marginBottom: "0rem",
              paddingLeft: "1rem",
            }}
          >
            About Us
          </h1>
          <p
            style={{
              color: "white",
              marginBottom: "3rem",
              paddingLeft: "2rem",
              paddingBottom: "1rem",
            }}
          >
            Welcome to Clerspecs, your number one source for the best range of
            spectacles, sunglasses as well as contact lenses. We're dedicated to
            giving you the very best of eye care products, with a focus on
            quality, afforadbility, and customer service.
          </p>
          <Card
            style={{
              color: "white",
              background: "transparent",
            }}
          >
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text
                style={{
                  paddingLeft: "1rem",
                }}
              >
                Our mission is to provide both consumers and retailers with a
                superior selection of eyewear and contact lenses at much
                affordable rates. Revolutionizing the eyewear industry by
                creating high-quality products accessible to anyone has been our
                primary aim.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          {loading ? (
            <Loader
              style={{
                marginTop: "2rem",
              }}
            />
          ) : error ? (
            <>
              <Message
                variant='danger'
                style={{
                  marginTop: "2rem",
                }}
              >
                {error.message}
              </Message>
              <Button variant='primary' onClick={handleRefresh}>
                Back
              </Button>
            </>
          ) : showSuccessMessage ? (
            <Alert variant='success'>
              <Alert.Heading>Hey {name}, nice to see you</Alert.Heading>
              <h3>We Got Your Message</h3>
              <hr />
              <p>
                Our Clerspecs team will get back to you within 5-7 working days.
              </p>
              <Button variant='primary' onClick={handleRefresh}>
                Back
              </Button>
            </Alert>
          ) : (
            <>
              <h1> Contact Us</h1>
              <p>Get in touch with us</p>
              <div className='my-4'>
                <p>
                  <i
                    className='fa-solid fa-envelope'
                    style={{ color: "#74C0FC" }}
                  ></i>{" "}
                  sales@clerspecs.com
                </p>
                <p>
                  <i
                    className='fa-solid fa-phone'
                    style={{ color: "#74C0FC" }}
                  ></i>{" "}
                  1234567890
                </p>
                <p>
                  <i
                    className='fa-solid fa-location-dot'
                    style={{ color: "#74C0FC" }}
                  ></i>{" "}
                  Siliguri, West Bengal
                </p>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='emailAddress'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter your valid Email'
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='message'>
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as='textarea'
                    placeholder='Enter your Message'
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant='primary'
                  type='submit'
                  style={{ marginBottom: "3rem" }}
                  // disabled={!isValidEmail}
                  disabled
                >
                  Submit
                </Button>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AboutUsScreen;
