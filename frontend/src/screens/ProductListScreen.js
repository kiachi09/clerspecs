import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  listProducts,
  deleteProduct,
  createProduct,
  createProductOffers,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { PRODUCT_CREATE_OFFERS_RESET } from "../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
  const [Type, setType] = useState("Eyeglasses");
  const [loadingReset, setloadingReset] = useState(false);

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const productCreateOffers = useSelector((state) => state.productCreateOffers);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const {
    loading: loadingCreateOffers,
    error: errorCreateOffers,
    success: successCreateOffers,
    product: createdProductOffers,
  } = productCreateOffers;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch({ type: PRODUCT_CREATE_OFFERS_RESET });
    const hasRecycleProduct = products.some(
      (product) => product.category === "Recycle"
    );
    const hasZeroOfferProduct = products.some(
      (product) => product.category === "Offers" && product.offerValue === 0
    );
    if (hasRecycleProduct) {
      toast.info("There are products in the Recycle category.");
    }
    if (hasZeroOfferProduct) {
      toast.info("There are Offers With Value 0.");
    }
    if (successCreateOffers) {
      history.push(`/admin/product/${createdProductOffers._id}/addOffers`);
    }
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/add`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    successCreateOffers,
    createdProductOffers,
    pageNumber,
  ]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  const createProductOffersHandler = () => {
    dispatch(createProductOffers());
  };

  const ResetSimilarityHandler = (e) => {
    if (window.confirm("Are you sure?")) {
      setloadingReset(true);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios
        .get(`/api/ResetSimilarityEyeglasses`, config)
        .then((response) => {
          console.log(response.data.message);
          toast.success(response.data.message);
          return axios.get(`/api/ResetSimilaritySunglasses`, config);
        })
        .then((response) => {
          console.log(response.data.message);
          toast.success(response.data.message);
          return axios.get(`/api/ResetSimilarityContactlens`, config);
        })
        .then((response) => {
          setloadingReset(false);
          console.log(response.data.message);
          toast.success(response.data.message);
        })
        .catch((error) => {
          setloadingReset(false);
          console.error(error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            toast.error(error.response.data.error);
          } else {
            toast.error("Error occurred. Please contact the dev team.");
          }
        });
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id))
        .then(() => {
          toast.success("Deleted successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error deleting product. Please try again.");
        });
    }
  };
  const renderProductTable = () => {
    switch (Type) {
      case "Eyeglasses":
        return (
          <Col>
            <Table className='mt-3'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              {products
                .filter((product) => product.category === "Eyeglasses")
                .map((product) => (
                  <tbody>
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit/${product.category}`}
                        >
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
        );
      case "Sunglasses":
        return (
          <Col>
            <Table className='mt-3'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              {products
                .filter((product) => product.category === "Sunglasses")
                .map((product) => (
                  <tbody>
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit/${product.category}`}
                        >
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
        );
      case "Contactlens":
        return (
          <Col>
            <Table className='mt-3'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              {products
                .filter((product) => product.category === "Contactlens")
                .map((product) => (
                  <tbody>
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit/${product.category}`}
                        >
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
        );
      case "Framelens":
        return (
          <Col>
            <Table className='mt-3'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              {products
                .filter((product) => product.category === "Framelens")
                .map((product) => (
                  <tbody>
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit/${product.category}`}
                        >
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
        );
      case "Brands":
        return (
          <Col>
            <h1>
              Total Brands(upon deletion only the Brand's image gets deleted)
            </h1>
            <Table className='mt-3'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>

                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              {products
                .filter((product) => product.name === "BrandImage")
                .map((product) => (
                  <tbody>
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>

                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
        );
      case "Offers":
        return (
          <Col>
            <h1>
              Total Offers(upon deletion only Offer gets deleted, Make sure to
              update the product's offer)
            </h1>
            <Table className='mt-3'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>OFFER NAME</th>
                  <th>OFFER VALUE </th>
                  <th>OFFER CATEGORY</th>
                </tr>
              </thead>
              {products
                .filter((product) => product.category === "Offers")
                .map((product) => (
                  <tbody>
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.offerName}</td>
                      <td>{product.offerValue}</td>
                      <td>{product.category}</td>

                      <td>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
        );
      case "Recycle":
        return (
          <Col>
            <Table className='mt-3'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              {products
                .filter((product) => product.category === "Recycle")
                .map((product) => (
                  <tbody>
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
        );
      default:
        return (
          <div>
            <h2>Welcome</h2>
            <p>Please select an Product.</p>
          </div>
        );
    }
  };
  return (
    <>
      <ToastContainer />
      {loadingReset ? (
        <div style={{ marginTop: "5rem" }}>
          <p style={{ color: "red" }}>
            Please Do not go back or Touch the Header while this process is
            Going on... (contact dev team on error){" "}
          </p>
          <Loader />
        </div>
      ) : (
        <div style={{ marginTop: "5rem" }}>
          <Row className='align-items-center'>
            <Col>
              <h1>Products</h1>
            </Col>
            <Col className='text-right'>
              <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus'></i> Create Product
              </Button>
            </Col>
            <Col className='text-right'>
              <Button className='my-3' onClick={ResetSimilarityHandler}>
                <i class='fa-solid fa-arrows-rotate'></i> Reset similarity
              </Button>
            </Col>
            <Col className='text-right'>
              <Button className='my-3' onClick={createProductOffersHandler}>
                <i className='fas fa-plus'></i> Add Offers
              </Button>
            </Col>
          </Row>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {loadingCreate && <Loader />}
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
          {loadingCreateOffers && <Loader />}
          {errorCreateOffers && (
            <Message variant='danger'>{errorCreateOffers}</Message>
          )}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <Container>
                <Row className='text-center'>
                  <Col>
                    <Button
                      onClick={() => setType("Eyeglasses")}
                      className={Type === "Eyeglasses" ? "btn-dark" : ""}
                    >
                      Eyeglasses
                    </Button>
                  </Col>

                  <Col>
                    <Button
                      onClick={() => setType("Sunglasses")}
                      className={Type === "Sunglasses" ? "btn-dark" : ""}
                    >
                      Sunglasses
                    </Button>
                  </Col>

                  <Col>
                    <Button
                      onClick={() => setType("Contactlens")}
                      className={Type === "Contactlens" ? "btn-dark" : ""}
                    >
                      Contact Lens
                    </Button>
                  </Col>

                  <Col>
                    <Button
                      onClick={() => setType("Framelens")}
                      className={Type === "Framelens" ? "btn-dark" : ""}
                    >
                      Frame Lens
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => setType("Brands")}
                      className={Type === "Brands" ? "btn-dark" : ""}
                    >
                      Brands
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => setType("Offers")}
                      className={Type === "Offers" ? "btn-dark" : ""}
                    >
                      Offers
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => setType("Recycle")}
                      className={Type === "Recycle" ? "btn-dark" : ""}
                    >
                      Recycle Bin
                    </Button>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <h3 className='text-center'>{Type}</h3>
                  {renderProductTable()}
                </Row>

                <Paginate pages={pages} page={page} isAdmin={true} />
              </Container>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductListScreen;
