import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import VerifyOtp from "../components/VerifyOtp";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import "react-toastify/dist/ReactToastify.css";
import { register, googleLogin } from "../actions/userActions";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { ToastContainer } from "react-toastify";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [OTPsuccess, setOTPsuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";
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
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <>
      <ToastContainer />
      <FormContainer>
        <h1 style={{ marginTop: "5rem" }}>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email address'
              value={email}
              onChange={handleEmailChange}
              required
            ></Form.Control>
          </Form.Group>

          {OTPsuccess ? (
            <>
              <Alert variant='success'>
                <p className='mb-0'>Email Verified! Set Your Password</p>
              </Alert>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm your password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Button type='submit' variant='primary' className='my-3'>
                  Register
                </Button>
              </Form.Group>
            </>
          ) : isValidEmail ? (
            <Form.Group>
              <VerifyOtp email={email} setOTPsuccess={setOTPsuccess} />{" "}
            </Form.Group>
          ) : (
            <Form.Group>
              <Button variant='primary' className='my-3' disabled>
                Proceed
              </Button>
            </Form.Group>
          )}
        </Form>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              dispatch(
                googleLogin(decoded.name, decoded.email, "abc456", true)
              );
            }}
            onError={() => {
              console.log("Google Sign in was unsuccessful. Try again later");
            }}
          />
        </GoogleOAuthProvider>
        <Row className='py-3'>
          <Col>
            Have an Account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
