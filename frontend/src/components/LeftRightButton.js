import React from "react";
import { Button } from "react-bootstrap";

const LeftRightButton = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;

  return (
    <div className='my-5 text-center'>
      <Button
        className={`arrow-button btn-light shadow mx-2 ${
          currentSlide === 0 ? " disable" : ""
        }}`}
        onClick={() => previous()}
      >
        <i className='fas fa-arrow-left'></i>
      </Button>
      <Button onClick={() => next()} className='arrow-button btn-light shadow'>
        <i className='fas fa-arrow-right'></i>
      </Button>
    </div>
  );
};

export default LeftRightButton;
