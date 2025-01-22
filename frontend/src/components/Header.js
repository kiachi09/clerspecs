import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Badge,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import SearchBox from "./SearchBox";
import Overlay from "./Overlay";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "../index.css";
// import { listProductEyeGlassBrands } from "../actions/productActions";
import { listProducts } from "../actions/productActions";

const Header = ({ history }) => {
  const history1 = useHistory();
  const [showOverlay, setShowOverlay] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const handleIconClick = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  // header ke useEffect mein bas ek dispatch and that to listallproducts aur waha se sare brands, shape, gender, colour, usage nikal lena hai.
  const ShopByGender = ({ category, data }) => {
    const uniqueGender = Array.from(
      new Set(
        products
          .filter((product) => product.category === category)
          .map((product) => product.gender)
      )
    );

    return (
      <>
        <Row className='justify-content-center mt-2 mb-2'>
          <Col xs='auto'>
            <h6 style={{ fontSize: "18px" }}>
              <strong>SHOP BY GENDER</strong>
            </h6>
          </Col>
        </Row>

        <Row>
          <Col
            style={{
              maxHeight: "250px", // Set the desired maximum height
              overflow: "auto", // Enable scrolling if content exceeds the height
              columnGap: "10px", // Adjust the gap between columns
            }}
          >
            {uniqueGender.map((gender, index) => (
              <div key={index}>
                <Row>
                  <LinkContainer to={`/${data}/gender-${gender}`}>
                    <Nav.Link>
                      <p
                        className='header-nav-hov'
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        {gender}
                      </p>
                    </Nav.Link>
                  </LinkContainer>
                </Row>
              </div>
            ))}
          </Col>
        </Row>
      </>
    );
  };

  const ShopByBrand = ({ category, data }) => {
    const uniqueBrand = Array.from(
      new Set(
        products
          .filter((product) => product.category === category)
          .map((product) => product.brand)
      )
    );
    return (
      <>
        <Row className='justify-content-center mt-2 mb-2'>
          <Col xs='auto'>
            <h6 style={{ fontSize: "18px" }}>
              <strong>SHOP BY BRAND</strong>
            </h6>
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              maxHeight: "250px", // Set the desired maximum height
              overflow: "auto", // Enable scrolling if content exceeds the height
              columnGap: "10px", // Adjust the gap between columns
            }}
          >
            {uniqueBrand.map((brand, index) => (
              <div key={index}>
                <Row>
                  <LinkContainer to={`/${data}/brand-${brand}`}>
                    <Nav.Link>
                      <p
                        className='header-nav-hov'
                        style={{ fontSize: "16px" }}
                      >
                        {brand}
                      </p>
                    </Nav.Link>
                  </LinkContainer>
                </Row>
              </div>
            ))}
          </Col>
        </Row>
      </>
    );
  };

  const ShopByShape = ({ category, data }) => {
    const uniqueShape = Array.from(
      new Set(
        products
          .filter((product) => product.category === category)
          .map((product) => product.shape)
      )
    );

    return (
      <>
        <Row className='justify-content-center mt-2 mb-2'>
          <Col xs='auto'>
            <h6 style={{ fontSize: "18px" }}>
              <strong>SHOP BY SHAPE</strong>
            </h6>
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              maxHeight: "250px", // Set the desired maximum height
              overflow: "auto", // Enable scrolling if content exceeds the height
              columnGap: "10px", // Adjust the gap between columns
            }}
          >
            {uniqueShape.map((Shape, index) => (
              <div key={index}>
                <Row>
                  <LinkContainer to={`/${data}/shape-${Shape}`}>
                    <Nav.Link>
                      <p
                        className='header-nav-hov'
                        style={{ fontSize: "16px" }}
                      >
                        {Shape}
                      </p>
                    </Nav.Link>
                  </LinkContainer>
                </Row>
              </div>
            ))}
          </Col>
        </Row>
      </>
    );
  };

  const ShopByColour = ({ category }) => {
    const uniqueColour = Array.from(
      new Set(
        products
          .filter((product) => product.category === category)
          .map((product) => product.colour)
      )
    );

    return (
      <>
        <Row className='justify-content-center mt-2 mb-2'>
          <Col xs='auto'>
            <h6 style={{ fontSize: "18px" }}>
              <strong>SHOP BY COLOURS</strong>
            </h6>
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              maxHeight: "250px", // Set the desired maximum height
              overflow: "auto", // Enable scrolling if content exceeds the height
              columnGap: "10px", // Adjust the gap between columns
            }}
          >
            {uniqueColour.map((colour, index) => (
              <div key={index}>
                <Row>
                  <LinkContainer to={`/${category}/colour-${colour}`}>
                    <Nav.Link>
                      <p
                        className='header-nav-hov'
                        style={{ fontSize: "16px" }}
                      >
                        {colour}
                      </p>
                    </Nav.Link>
                  </LinkContainer>
                </Row>
              </div>
            ))}
          </Col>
        </Row>
      </>
    );
  };

  const ShopByUsage = ({ category }) => {
    const uniqueUsage = Array.from(
      new Set(
        products
          .filter((product) => product.category === category)
          .map((product) => product.usage)
      )
    );

    return (
      <>
        <Row className='justify-content-center mt-2 mb-2'>
          <Col xs='auto'>
            <h6 style={{ fontSize: "18px" }}>
              <strong>SHOP BY USAGE</strong>
            </h6>
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              maxHeight: "250px", // Set the desired maximum height
              overflow: "auto", // Enable scrolling if content exceeds the height
              columnGap: "10px", // Adjust the gap between columns
            }}
          >
            {uniqueUsage.map((usage, index) => (
              <div key={index}>
                <Row>
                  <LinkContainer to={`/${category}/usage-${usage}`}>
                    <Nav.Link>
                      <p
                        className='header-nav-hov'
                        style={{ fontSize: "16px" }}
                      >
                        {usage}
                      </p>
                    </Nav.Link>
                  </LinkContainer>
                </Row>
              </div>
            ))}
          </Col>
        </Row>
      </>
    );
  };

  const SunglassesPopover = () => {
    return (
      <div>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Col
            md={4}
            style={{
              color: "black",
              textAlign: "center",
              borderRight: "3px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <ShopByGender category='Sunglasses' data='goggles' />
          </Col>

          <Col
            md={4}
            style={{
              color: "black",
              textAlign: "center",
              borderRight: "3px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <ShopByBrand category='Sunglasses' data='goggles' />
          </Col>

          <Col md={4} style={{ color: "black", textAlign: "center" }}>
            <ShopByShape category='Sunglasses' data='goggles' />
          </Col>
        </Row>
      </div>
    );
  };
  const EyeglassesPopover = () => {
    return (
      <div>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Col
            md={4}
            style={{
              color: "black",
              textAlign: "center",
              borderRight: "3px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <ShopByGender category='Eyeglasses' data='specs' />
          </Col>

          <Col
            md={4}
            style={{
              color: "black",
              textAlign: "center",
              borderRight: "3px solid rgba(0, 0, 0, 0.1) ",
            }}
          >
            <ShopByBrand category='Eyeglasses' data='specs' />
          </Col>

          <Col md={4} style={{ color: "black", textAlign: "center" }}>
            <ShopByShape category='Eyeglasses' data='specs' />
          </Col>
        </Row>
      </div>
    );
  };

  const ContactlensPopover = () => {
    return (
      <div>
        <Row>
          <Row>
            <Col
              md={4}
              style={{
                color: "black",
                textAlign: "center",
                borderRight: "3px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <ShopByUsage category='Contactlens' />
            </Col>

            <Col
              md={4}
              style={{
                color: "black",
                textAlign: "center",
                borderRight: "3px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <ShopByBrand category='Contactlens' data='Contactlens' />
            </Col>
            <Col md={4} style={{ color: "black", textAlign: "center" }}>
              <ShopByColour category='Contactlens' />
            </Col>
          </Row>
        </Row>
      </div>
    );
  };

  return (
    <header className='fixed-header'>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image
                src='/staticuploads/ScreenPic10.png'
                // src='../images/logo.png'
                alt='logo'
                className='logo'
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox onIconClick={handleIconClick} />
            <Route
              render={({ history }) => (
                <>
                  {showOverlay && (
                    <Overlay onClose={handleCloseOverlay} history={history} />
                  )}
                </>
              )}
            />

            <Nav className='ms-auto'>
              <LinkContainer to='/specs'>
                <Tippy
                  interactive='true'
                  content={<EyeglassesPopover />}
                  maxWidth={1000}
                  theme='custom'
                  placement='bottom'
                >
                  <Nav.Link
                    onClick={() => {
                      // Redirect the user to the "/Contactlens" route
                      history1.push("/specs");
                    }}
                    style={{
                      transition: "all 0.3s ease", // Add a smooth transition
                      borderRadius: "4px", // Add border radius for a rounded effect
                      backgroundColor: "transparent", // Set initial background color to transparent
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "rgba(0, 0, 0, 0.3)"; // Set background color on hover
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent"; // Reset background color
                    }}
                  >
                    Eyeglasses
                  </Nav.Link>
                </Tippy>
              </LinkContainer>
              <LinkContainer to='/goggles'>
                <Tippy
                  interactive='true'
                  content={<SunglassesPopover />}
                  maxWidth={1000}
                  theme='custom'
                  placement='bottom'
                >
                  <Nav.Link
                    onClick={() => {
                      // Redirect the user to the "/Contactlens" route
                      history1.push("/goggles");
                    }}
                    style={{
                      transition: "all 0.3s ease", // Add a smooth transition
                      borderRadius: "4px", // Add border radius for a rounded effect
                      backgroundColor: "transparent", // Set initial background color to transparent
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "rgba(0, 0, 0, 0.3)"; // Set background color on hover
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent"; // Reset background color
                    }}
                  >
                    Sunglasses
                  </Nav.Link>
                </Tippy>
              </LinkContainer>
              <LinkContainer to='/Contactlens'>
                <Tippy
                  interactive='true'
                  content={<ContactlensPopover />}
                  maxWidth={1000}
                  theme='custom'
                  placement='bottom'
                >
                  <Nav.Link
                    onClick={() => {
                      // Redirect the user to the "/Contactlens" route
                      history1.push("/Contactlens");
                    }}
                    style={{
                      transition: "all 0.3s ease", // Add a smooth transition
                      borderRadius: "4px", // Add border radius for a rounded effect
                      backgroundColor: "transparent", // Set initial background color to transparent
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "rgba(0, 0, 0, 0.3)"; // Set background color on hover
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent"; // Reset background color
                    }}
                  >
                    Contact Lens
                  </Nav.Link>
                </Tippy>
              </LinkContainer>
              <LinkContainer to='/aboutUs'>
                <Nav.Link
                  onClick={() => {
                    history1.push("/aboutUs");
                  }}
                  style={{
                    transition: "all 0.3s ease", // Add a smooth transition
                    borderRadius: "4px", // Add border radius for a rounded effect
                    backgroundColor: "transparent", // Set initial background color to transparent
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(0, 0, 0, 0.3)"; // Set background color on hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent"; // Reset background color
                  }}
                >
                  About Us
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className='ms-auto '>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg='success'
                      style={{
                        marginLeft: "5px",
                        top: "-10px",
                        position: "relative",
                      }}
                    >
                      {cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/'>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Log Out
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/Addphotos'>
                    <NavDropdown.Item>Add photos</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
