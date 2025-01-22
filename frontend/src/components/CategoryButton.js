import React from "react";
import { Button } from "react-bootstrap";

const CategoryButton = ({ setType }) => {
  return (
    <div>
      <div className='my-5 justify-content-start category-button-container '>
        <Button
          onClick={() => setType("Eyeglasses")}
          className='category-button btn-light shadow mx-2'
        >
          Eyeglasses
        </Button>

        <Button
          onClick={() => setType("Sunglasses")}
          className='category-button btn-light shadow'
        >
          Sunglasses
        </Button>
        <Button
          onClick={() => setType("Contactlens")}
          className='category-button btn-light shadow mx-2'
        >
          Contact Lens
        </Button>
      </div>
    </div>
  );
};

export default CategoryButton;
