import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FrameMap from "../components/FrameMap";
import OfferMap from "../components/OfferMap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(match.params.category);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [gender, setGender] = useState("");
  const [shape, setShape] = useState("");
  const [usage, setUsage] = useState("");
  const [colour, setColour] = useState("");
  const [frameIds, setFrameIds] = useState([]);
  const [offersIds, setOffersIds] = useState([]);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

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
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setGender(product.gender);
        setColour(product.colour);
        setShape(product.shape);
        setUsage(product.usage);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setFrameIds(product.frameIds);
        setOffersIds(product.OffersIds);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  const submitHandler = (e) => {
    setDisable(false);
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
          shape,
          gender,
          colour,
          usage,
          frameIds,
          offersIds,
        })
      );
    }

    history.push("/admin/productlist");
    window.location.reload();
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
      setDisable(true);
    } catch (error) {
      setUploading(true);
    }
  };

  const format = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <Link
        to='/admin/productlist'
        className='btn btn-light'
        style={{ marginTop: "5rem" }}
      >
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product {product.name}</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                disabled={disable}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                id='image-file'
                label='Choose File'
                accept='.jpg, .jpeg, .png'
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(format(e.target.value))}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder={
                  match.params.category === "Contactlens" ||
                  match.params.category === "Framelens"
                    ? "Enter count in stock(One Pair of Lens will be counted as 1)"
                    : "Enter Count in Stock"
                }
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={match.params.category}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {(match.params.category === "Eyeglasses" ||
              match.params.category === "Sunglasses") && (
              <div>
                <Form.Group controlId='gender'>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter gender'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='shape'>
                  <Form.Label>Shape</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter shape'
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Edit FrameLenses - </Form.Label>
                  <FrameMap frameIds={frameIds} setFrameIds={setFrameIds} />
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Edit Product with Offers - </Form.Label>
                  <OfferMap offersIds={offersIds} setOffersIds={setOffersIds} />
                </Form.Group>
              </div>
            )}

            {(match.params.category === "Contactlens" ||
              match.params.category === "Framelens") && (
              <Form.Group controlId='colour'>
                <Form.Label>Colour</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter colour'
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                ></Form.Control>
              </Form.Group>
            )}

            {match.params.category === "Contactlens" && (
              <div>
                <Form.Group controlId='usage'>
                  <Form.Label>usage</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Usage'
                    value={usage}
                    onChange={(e) => setUsage(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Edit Product with Offers - </Form.Label>
                  <OfferMap offersIds={offersIds} setOffersIds={setOffersIds} />
                </Form.Group>
              </div>
            )}

            {uploading ? (
              <Loader />
            ) : (
              <Button className='mt-1' type='submit' variant='primary'>
                Update
              </Button>
            )}
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
