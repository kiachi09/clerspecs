import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import VerifyOtp from "../components/VerifyOtp";

import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listUserOrders } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const ProfileScreen = (history, location) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTPsuccess, setOTPsuccess] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const orderUserList = useSelector((state) => state.orderUserList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderUserList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, error: errorUpdate } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listUserOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user, success]);
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
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      if (window.confirm("Are you sure?")) {
        dispatch(
          updateUserProfile({ id: user._id, name, email, password })
        ).then(() => {
          toast.info("Updated Request Sent");
          setMessage(null);
          setOTPsuccess(false);
          setIsValidEmail(false);
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Row style={{ marginTop: "5rem" }}>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loading && <Loader />}
          {user.signInGoogle ? (
            <Alert variant='info'> Logged in Through Google </Alert>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter your New or Existing name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
                <Form.Text className='text-muted'>
                  Enter your New Name or leave as it is
                </Form.Text>
              </Form.Group>
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter your New or Existing email address'
                  value={email}
                  onChange={handleEmailChange}
                ></Form.Control>
                <Form.Text className='text-muted'>
                  Enter your New Email or leave as it is
                </Form.Text>
              </Form.Group>
              {OTPsuccess ? (
                <>
                  <Alert variant='success'>
                    <p className='mb-0'>
                      Email Verified! Set Your Updated Password
                    </p>
                  </Alert>
                  <Form.Group controlId='password'>
                    <Form.Label>Update Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter your New or Existing password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Updated Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Confirm your New or Existing password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Button type='submit' variant='primary' className='my-3'>
                      Update
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
          )}
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
