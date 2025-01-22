import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const HomePageCards = ({ title, image, link }) => {
  return (
    <Card
      className=' shadow  bg-white  rounded'
      style={{ borderColor: "white" }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Link to={link}>
          <Card.Img
            variant='top'
            src={image}
            style={{ height: "40vh", objectFit: "fit" }}
            fluid
          />
        </Link>
      </div>
      <Card.Body
        style={{
          height: "50px",
          textAlign: "center",
          overflow: "hidden",
          paddingTop: "0px",
          paddingBottom: "0px",
        }}
      >
        <Link to={link}>
          <Button className='my-2 rounded'>{title}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default HomePageCards;
