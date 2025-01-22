import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
// import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className='shadow mb-5 bg-white my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          style={{ height: "auto" }}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            {/* <strong style={{ float: "left" }}>{product.name}</strong> */}
            <strong style={{ float: "left" }}>{product.name}</strong>
            <strong style={{ float: "right" }}>${product.price}</strong>
          </Card.Title>
        </Link>

        {/* <Card.Text as='div'>
          <div className='my-3'>
            {product.rating} from {product.numReviews} reviews
          </div>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color='#009FE5'
          />
        </Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default Product;
