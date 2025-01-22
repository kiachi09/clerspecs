import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
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

const ProductAddScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [Type, setType] = useState("choose");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [shape, setShape] = useState("");
  const [usage, setUsage] = useState("");
  const [colour, setColour] = useState("");
  const [offersIds, setOffersIds] = useState([]);

  const [frameIds, setFrameIds] = useState([]);
  // frameIds here actually contain ids of the framelens dont confuse with frames
  const [uploading, setUploading] = useState(false);
  const [disable, setDisable] = useState(false);
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
    }
  }, [dispatch, history, successUpdate]);

  useEffect(() => {
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
  }, [dispatch, product, productId, history]);

  const submitHandler = (e) => {
    setDisable(false);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
    }
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
      console.error(error);

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
      <h1>Add Products In Clearspecs</h1>
      <Row className='text-center'>
        <Col>
          <Button
            onClick={() => setType("Eyeglasses")}
            className={Type === "Eyeglasses" ? "btn-dark" : ""}
            disabled={Type !== "choose" && Type !== "Eyeglasses"}
          >
            Eyeglasses
          </Button>
        </Col>

        <Col>
          <Button
            onClick={() => setType("Sunglasses")}
            className={Type === "Sunglasses" ? "btn-dark" : ""}
            disabled={Type !== "choose" && Type !== "Sunglasses"}
          >
            Sunglasses
          </Button>
        </Col>

        <Col>
          <Button
            onClick={() => setType("Contactlens")}
            className={Type === "Contactlens" ? "btn-dark" : ""}
            disabled={Type !== "choose" && Type !== "Contactlens"}
          >
            Contact Lens
          </Button>
        </Col>

        <Col>
          <Button
            onClick={() => setType("Framelens")}
            className={Type === "Framelens" ? "btn-dark" : ""}
            disabled={Type !== "choose" && Type !== "Framelens"}
          >
            Frame Lens
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => setType("Brands")}
            className={Type === "Brands" ? "btn-dark" : ""}
            disabled={Type !== "choose" && Type !== "Brands"}
          >
            Brand Images
          </Button>
        </Col>
      </Row>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <div>
            {Type === "choose" && (
              <h5 className='text-center'>
                Please choose from the above options
              </h5>
            )}

            {/* EYE GLASSES SECTION */}

            {Type === "Eyeglasses" && (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>EyeGlass Name</Form.Label>
                  <Form.Control
                    required
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                  <Form.Label>EyeGlass Price</Form.Label>
                  <Form.Control
                    required
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                  <Form.Label>EyeGlass Image</Form.Label>
                  <Form.Control
                    type='text'
                    required
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
                  <Form.Label>EyeGlass Brand </Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter brand'
                    value={brand}
                    onChange={(e) => setBrand(format(e.target.value))}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    required
                    type='number'
                    placeholder='Enter count in stock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
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
                    <option value={Type}>{Type}</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='gender'>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter Targeted Section (Men,Women,Kids)'
                    value={gender}
                    onChange={(e) => setGender(format(e.target.value))}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='shape'>
                  <Form.Label>Shape</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter Shape of the Product'
                    value={shape}
                    onChange={(e) => setShape(format(e.target.value))}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Map Eyeglass with FrameLenses - </Form.Label>
                  <FrameMap frameIds={frameIds} setFrameIds={setFrameIds} />
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Map Eyeglass with Offers - </Form.Label>
                  <OfferMap offersIds={offersIds} setOffersIds={setOffersIds} />
                </Form.Group>
                {uploading ? (
                  <Loader />
                ) : (
                  <Button className='mt-2' type='submit' variant='primary'>
                    Add {Type}
                  </Button>
                )}
              </Form>
            )}

            {/* SUNGLASSES SECTION */}

            {Type === "Sunglasses" && (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Sunglass Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                  <Form.Label>Sunglass Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                  <Form.Label>Sunglass Image</Form.Label>
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
                  <Form.Label>Sunglass Brand </Form.Label>
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
                    placeholder='Enter count in stock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
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
                    <option value={Type}>{Type}</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId='description'>
                  <Form.Label>Sunglass Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='gender'>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter Targeted Section (Men,Women,Kids)'
                    value={gender}
                    onChange={(e) => setGender(format(e.target.value))}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='shape'>
                  <Form.Label>Shape</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter Shape of the Product'
                    value={shape}
                    onChange={(e) => setShape(format(e.target.value))}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Map Sunglass with Frames</Form.Label>
                  <FrameMap frameIds={frameIds} setFrameIds={setFrameIds} />
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Map Sunglass with Offers - </Form.Label>
                  <OfferMap offersIds={offersIds} setOffersIds={setOffersIds} />
                </Form.Group>
                {uploading ? (
                  <Loader />
                ) : (
                  <Button className='mt-1' type='submit' variant='primary'>
                    Add {Type}
                  </Button>
                )}
              </Form>
            )}

            {/* CONTACT lENS SECTION */}

            {Type === "Contactlens" && (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Contactlens Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                  <Form.Label>Contactlens Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                  <Form.Label>Contactlens Image</Form.Label>
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
                  <Form.Label>Contactlens Brand </Form.Label>
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
                    placeholder='Enter count in stock(One Pair of Lens will be counted as 1)'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
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
                    <option value={Type}>{Type}</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId='description'>
                  <Form.Label>Sunglass Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='colour'>
                  <Form.Label>Colour</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter Colour of the ContactLens'
                    value={colour}
                    onChange={(e) => setColour(format(e.target.value))}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='usage'>
                  <Form.Label>Usage</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Usage of the Product(Daily,Monthly,Quaterly,Yearly)'
                    value={usage}
                    onChange={(e) => setUsage(format(e.target.value))}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='mt-2'>
                  <Form.Label>Map Contact Lens with Offers - </Form.Label>
                  <OfferMap offersIds={offersIds} setOffersIds={setOffersIds} />
                </Form.Group>
                {uploading ? (
                  <Loader />
                ) : (
                  <Button className='mt-1' type='submit' variant='primary'>
                    Add {Type}
                  </Button>
                )}
              </Form>
            )}

            {/* FRAMElENS SECTION */}

            {Type === "Framelens" && (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Framelens Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                  <Form.Label>Framelens Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                  <Form.Label>Framelens Image</Form.Label>
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
                  <Form.Label>Framelens Brand </Form.Label>
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
                    placeholder='Enter count in stock(One Pair of Lens will be counted as 1)'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
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
                    <option value={Type}>{Type}</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId='description'>
                  <Form.Label>Frame lens Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='colour'>
                  <Form.Label>Colour</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter Colour of the Framelens'
                    value={colour}
                    onChange={(e) => setColour(format(e.target.value))}
                  ></Form.Control>
                </Form.Group>
                {uploading ? (
                  <Loader />
                ) : (
                  <Button className='mt-1' type='submit' variant='primary'>
                    Add {Type}
                  </Button>
                )}
              </Form>
            )}

            {/* BRANDS */}

            {Type === "Brands" && (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Type of Image</Form.Label>
                  <Form.Select
                    type='name'
                    onChange={(e) => setName(e.target.value)}
                  >
                    <option value='' hidden>
                      Select
                    </option>
                    <option value='BrandImage'>Brand Image</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId='image'>
                  <Form.Label>Brand Image</Form.Label>
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
                  <Form.Label>Brand Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter brand'
                    value={brand}
                    onChange={(e) => setBrand(format(e.target.value))}
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
                    <option value='EyeglassesBrand'>Eyeglasses Brand</option>
                    <option value='SunglassesBrand'>Sunglasses Brand</option>
                    <option value='ContactlensBrand'>Contactlens Brand</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId='description'>
                  <Form.Label>Some Description </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {uploading ? (
                  <Loader />
                ) : (
                  <Button className='mt-1' type='submit' variant='primary'>
                    Add {Type}
                  </Button>
                )}
              </Form>
            )}
          </div>
        )}
      </FormContainer>
    </>
  );
};

export default ProductAddScreen;
