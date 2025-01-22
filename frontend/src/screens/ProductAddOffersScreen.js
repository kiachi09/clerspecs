import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductAddOffersScreen = ({ match, history }) => {
  const productId = match.params.id;
  //   const [Type, setType] = useState("choose");
  const [Offername, setOfferName] = useState("");
  const [Offervalue, setOfferValue] = useState(0);

  const [category, setCategory] = useState("");

  const [Offerdescription, setOfferDescription] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setOfferName(product.offerName);
        setOfferValue(product.offerValue);

        setCategory(product.category);

        setOfferDescription(product.offerDesc);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  const submitHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
    }
    if (window.confirm("Are you sure?")) {
      dispatch(
        updateProduct({
          _id: productId,
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          countInStock: product.countInStock,
          description: product.description,
          Offername,
          Offervalue,
          category,
          Offerdescription,
        })
      );
    }

    history.push("/admin/productlist");
    // window.location.reload();
  };

  const format = (value) => {
    return value.toUpperCase();
  };

  return (
    <>
      <Link
        to='/admin/productlist'
        className='btn btn-light'
        style={{ marginTop: "5rem" }}
      >
        Go Back
      </Link>
      <h1>Add Offers In Clearspecs</h1>

      <FormContainer>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <div>
            {/* adding Offer section - it will be added as an product on the product collection only */}

            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Offer Name</Form.Label>
                <Form.Control
                  required
                  type='Offername'
                  placeholder='Enter name'
                  value={Offername}
                  onChange={(e) => setOfferName(format(e.target.value))}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Offer Value</Form.Label>
                <Form.Control
                  required
                  type='number'
                  placeholder='Enter Offer value'
                  value={Offervalue}
                  onChange={(e) => setOfferValue(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Select Category</Form.Label>
                <Form.Select
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  onInvalid={(e) => {
                    e.target.setCustomValidity("Please Choose this");
                  }}
                  onInput={(e) => {
                    e.target.setCustomValidity("");
                  }}
                >
                  <option value='' hidden>
                    Select
                  </option>
                  <option value='Offers'>Offers</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label>Offer Description</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Enter Offer description'
                  value={Offerdescription}
                  onChange={(e) => setOfferDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button className='mt-2' type='submit' variant='primary'>
                Add Offer
              </Button>
            </Form>
          </div>
        )}
      </FormContainer>
    </>
  );
};

export default ProductAddOffersScreen;
