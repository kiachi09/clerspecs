import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Row, Col, Button, Image } from "react-bootstrap";

const HomePageCarousel = () => {
  return (
    <Carousel variant='dark' pause='hover'>
      <Carousel.Item>
        <div className='carousel-img'>
          <Image
            src='../../staticuploads/ScreenPic0.jpg'
            style={{
              width: "100%",
            }}
            fluid
          />
        </div>
        <Carousel.Caption className='right-caption'>
          <Row>
            <h1 className='caption-title'>
              Try on 2 frames for free, without leaving home
            </h1>
            <p className='caption-desc'>
              Pick your favourite styles to try out for 5 days. It's easy and
              completely free <br /> - including remote shippping!
            </p>
            <Col>
              <Link to='/specs'>
                <Button variant='primary' className='br-15'>
                  Browse Eyeglasses
                </Button>
              </Link>
              <Link to='/goggles'>
                <Button className='br-15'>Browse Sunglasses</Button>
              </Link>
            </Col>
          </Row>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className='carousel-img'>
          <Image
            src='../../staticuploads/ScreenPic0.jpg'
            style={{
              width: "100%",
            }}
            fluid
          />
        </div>
        <Carousel.Caption className='right-caption'>
          <Row>
            <h1 className='caption-title'>
              Looking for the latest? Shop new arrivals.
            </h1>
            <Col>
              <Link to='/specs'>
                <Button className='Psbutton shadow btn-light'>
                  Browse eyeglasses
                </Button>
              </Link>
              <Link to='/goggles'>
                <Button className='Psbutton shadow btn-light'>
                  Browse sunglasses
                </Button>
              </Link>
            </Col>
          </Row>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className='carousel-img'>
          <Image
            src='../../staticuploads/ScreenPic0.jpg'
            style={{
              width: "100%",
            }}
            fluid
          />
        </div>
        <Carousel.Caption className='right-caption'>
          <Row>
            <h1 className='caption-title'>
              Need a new Contact Lens? Shop our wide range of contact Lenses.
            </h1>
            <Col>
              <Link to='/Contactlens'>
                <Button className='br-15'>Browse Contactlenses</Button>
              </Link>
            </Col>
          </Row>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomePageCarousel;
