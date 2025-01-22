import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
// import SizeGuide from "../../staticuploads/ScreenPic7.jpg";
// import SizeGuideCL from "../../staticuploads/ScreenPic8.jpg";

import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

function SizeGuideModal({ product }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        style={{ border: "1px solid #2f99d1", borderRadius: "2.5rem" }}
        className='shadow btn-light'
        onClick={handleShow}
      >
        <i
          style={{
            color: "#2f99d1",
            paddingRight: "0.5rem",
          }}
          className={`fa-solid ${
            product.category === "Contactlens"
              ? "fa-person-chalkboard"
              : "fa-ruler"
          }`}
        ></i>
        {product.category === "Contactlens" ? "Instruction" : "Size Guide"}
      </Button>

      <Modal
        show={show}
        backdrop='static'
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span style={{ fontWeight: "bold" }}>
              {product.category === "Contactlens" ? "Instruction" : "SizeGuide"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={
              product.category === "Contactlens"
                ? "../../staticuploads/ScreenPic8.jpg"
                : "../../staticuploads/ScreenPic7.jpg"
            }
            fluid
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ border: "1px solid #2f99d1", borderRadius: "2.5rem" }}
            className='shadow btn-light'
            onClick={handleClose}
          >
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SizeGuideModal;
