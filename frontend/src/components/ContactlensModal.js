import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Modal,
  Row,
  Image,
  ListGroup,
  ProgressBar,
  Form,
  ListGroupItem,
} from "react-bootstrap";

function ContactlensModal({
  type,
  setType,
  product,
  addToCartHandler,
  setSpecification,
  Specification,
}) {
  const [show, setShow] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Adjust the breakpoint as per your needs
        setIsFullscreen(false);
      } else {
        setIsFullscreen(true);
      }
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const initialFormValues = {
    od_sph: 0,
    od_cyl: 0,
    od_axis: 0,
    os_sph: 0,
    os_cyl: 0,
    os_axis: 0,
    Add_Power: 0,
    pd_type: " ",
    pd_value: 0,
    PrescriptionImage: " ",
  };
  const [formData, setFormData] = useState(initialFormValues);
  const handleChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };
  const handleShow = () => {
    setShow(true);
  };
  const Handleform1 = (value) => {
    setSpecification({ ...Specification, prescriptionType: value });
    setType("3");
  };
  const uploadPrescriptionHandler = async (e) => {
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append("PrescriptionImage", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/upload/PrescriptionImage",
        formData1,
        config
      );

      const ImageId = data.substring(data.lastIndexOf("-") + 1);

      setFormData({
        ...formData,
        PrescriptionImage: ImageId,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const Handleform2 = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    } else {
      setSpecification(() => ({
        ...Specification,
        ManualValues: formData,
      }));
      setType("4");
    }
  };
  const handleClose = () => {
    setType("2");
    setSpecification({
      ...Specification,
      // frame: "",
      prescriptionType: " ",
      qty: 1,
      ManualValues: {
        od_sph: 0,
        od_cyl: 0,
        od_axis: 0,
        os_sph: 0,
        os_cyl: 0,
        os_axis: 0,
        Add_Power: 0,
        pd_type: " ",
        pd_value: 0,
        PrescriptionImage: " ",
      },
    });
    setShow(false);
  };
  const handleBack1 = () => {
    setFormData({
      ...formData,
      PrescriptionImage: " ",
      od_sph: 0,
      od_cyl: 0,
      od_axis: 0,
      os_sph: 0,
      os_cyl: 0,
      os_axis: 0,
      Add_Power: 0,
      pd_type: " ",
      pd_value: 0,
    });
    setType("2");
  };
  const handleBack2 = () => {
    setFormData({
      ...formData,
      PrescriptionImage: " ",
      od_sph: 0,
      od_cyl: 0,
      od_axis: 0,
      os_sph: 0,
      os_cyl: 0,
      os_axis: 0,
      Add_Power: 0,
      pd_type: " ",
      pd_value: 0,
    });
    setType("3");
  };
  return (
    <>
      <Row className='text-center'>
        <Button
          type='button'
          onClick={handleShow}
          disabled={product.countInStock === 0}
          className=' Psbutton shadow btn-light'
        >
          Buy Lens
        </Button>
      </Row>

      <Modal
        //  when the modal body ka cheeze badh jaye toh scrollable karke ek feature daal sakte hai
        animation
        backdrop='static'
        // size='xl'
        dialogClassName={isFullscreen ? "" : "modal-xl"}
        fullscreen={isFullscreen}
        show={show}
        onHide={handleClose}
      >
        <Row style={{ height: "100%" }}>
          <Col style={{ margin: "auto" }} className='text-center' md={4}>
            <Image src={product.image} alt={product.name} fluid />
            <h3>{product.name}</h3>
          </Col>

          {(() => {
            switch (type) {
              case "2":
                return (
                  <Col className='shadow' md={8}>
                    <ProgressBar
                      className=' Fpro shadow'
                      variant='info'
                      animated
                      now={33}
                    />
                    <Modal.Header closeButton>
                      <Button
                        onClick={handleClose}
                        size='sm'
                        className='btn-light Psbutton shadow'
                      >
                        <i className='fa fa-arrow-left' aria-hidden='true'></i>
                      </Button>
                    </Modal.Header>

                    <Modal.Title className='text-center'>
                      Select Prescription Type
                    </Modal.Title>
                    <Modal.Body>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <Button
                            size='sm'
                            onClick={() => {
                              Handleform1("Single-Vision");
                            }}
                            className='Psbutton shadow btn-light'
                          >
                            Single-Vision/Powered Contact Lens
                          </Button>
                          <p className='my-2  FP'>
                            Corrects for one field of vision (near,
                            intermediate, or distance)
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Button
                            size='sm'
                            onClick={() => {
                              Handleform1("Zero-Power-Computer-Lens");
                            }}
                            value=' Zero Power Computer Lens
                              '
                            className='Psbutton shadow btn-light'
                          >
                            Zero Power Computer Lens
                          </Button>
                          <p className='my-2 FP'>
                            Fashion or Protection from Glare/Computer Screens
                            etc.
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Button
                            size='sm'
                            onClick={() => {
                              Handleform1("Progressive");
                            }}
                            value='Progressive'
                            className='Psbutton shadow btn-light'
                          >
                            Bifocal/Progressive Eyeglasses
                          </Button>
                          <p className='my-2 FP'>
                            Distance & Near vision in same lenses.
                          </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <h6 className='my-2 FP'>
                            Please choose the lens/Prescription depending upon
                            need and your eye
                          </h6>
                        </ListGroup.Item>
                      </ListGroup>
                    </Modal.Body>
                  </Col>
                );

              case "3":
                return (
                  <Col className='shadow' md={8}>
                    <ProgressBar
                      className=' Fpro shadow'
                      variant='info'
                      animated
                      now={66}
                    />

                    <Modal.Header closeButton>
                      <Button
                        onClick={handleBack1}
                        size='sm'
                        className='btn-light Psbutton shadow'
                      >
                        <i className='fa fa-arrow-left' aria-hidden='true'></i>
                      </Button>
                    </Modal.Header>

                    <Modal.Title className='text-center'>
                      Enter Your Prescription Manually
                    </Modal.Title>
                    <Modal.Body>
                      <Form onSubmit={Handleform2}>
                        <ListGroup variant='flush'>
                          <ListGroupItem>
                            <Form.Label as='legend'>OD (Right Eye)</Form.Label>
                            <Row>
                              <Form.Group as={Col} xs='4'>
                                SPH
                                <Form.Select
                                  required
                                  size='sm'
                                  as='select'
                                  // value={formData.od_sph}
                                  onChange={(e) =>
                                    handleChange("od_sph", e.target.value)
                                  }
                                  onInvalid={(e) => {
                                    e.target.setCustomValidity(
                                      "Please select a value for this field or please select 0 if choosing document upload."
                                    );
                                  }}
                                  onInput={(e) => {
                                    e.target.setCustomValidity("");
                                  }}
                                >
                                  <option value='' hidden>
                                    Select
                                  </option>
                                  {[...Array(40).keys()].map((x) => {
                                    const value = -9.5 + x * 0.5; // Calculate the value

                                    if (value % 1 === 0) {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    } else {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    }
                                  })}
                                </Form.Select>
                              </Form.Group>
                              <Form.Group as={Col} xs='4'>
                                CYL{" "}
                                <Form.Select
                                  required
                                  size='sm'
                                  as='select'
                                  // value={formData.od_cyl}
                                  onChange={(e) =>
                                    handleChange("od_cyl", e.target.value)
                                  }
                                  onInvalid={(e) => {
                                    e.target.setCustomValidity(
                                      "Please select a value for this field or please select 0 if choosing document upload."
                                    );
                                  }}
                                  onInput={(e) => {
                                    e.target.setCustomValidity("");
                                  }}
                                >
                                  <option value='' hidden>
                                    Select
                                  </option>
                                  {[...Array(40).keys()].map((x) => {
                                    const value = -9.5 + x * 0.5; // Calculate the value

                                    if (value % 1 === 0) {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    } else {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    }
                                  })}
                                </Form.Select>
                              </Form.Group>
                              <Form.Group as={Col} xs='4'>
                                AXIS{" "}
                                <Form.Select
                                  required
                                  size='sm'
                                  as='select'
                                  // value={formData.od_axis}
                                  onChange={(e) =>
                                    handleChange("od_axis", e.target.value)
                                  }
                                  onInvalid={(e) => {
                                    e.target.setCustomValidity(
                                      "Please select a value for this field or please select 0 if choosing document upload."
                                    );
                                  }}
                                  onInput={(e) => {
                                    e.target.setCustomValidity("");
                                  }}
                                >
                                  <option value='' hidden>
                                    Select
                                  </option>
                                  {[...Array(40).keys()].map((x) => {
                                    const value = -9.5 + x * 0.5; // Calculate the value

                                    if (value % 1 === 0) {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    } else {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    }
                                  })}
                                </Form.Select>
                              </Form.Group>
                            </Row>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Form.Label as='legend'>OS (Left Eye)</Form.Label>
                            <Row>
                              <Form.Group as={Col} xs='4'>
                                SPH
                                <Form.Select
                                  required
                                  size='sm'
                                  as='select'
                                  // value={formData.os_sph}
                                  onChange={(e) =>
                                    handleChange("os_sph", e.target.value)
                                  }
                                  onInvalid={(e) => {
                                    e.target.setCustomValidity(
                                      "Please select a value for this field or please select 0 if choosing document upload."
                                    );
                                  }}
                                  onInput={(e) => {
                                    e.target.setCustomValidity("");
                                  }}
                                >
                                  <option value='' hidden>
                                    Select
                                  </option>
                                  {[...Array(40).keys()].map((x) => {
                                    const value = -9.5 + x * 0.5; // Calculate the value

                                    if (value % 1 === 0) {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    } else {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    }
                                  })}
                                </Form.Select>
                              </Form.Group>
                              <Form.Group as={Col} xs='4'>
                                CYL{" "}
                                <Form.Select
                                  required
                                  size='sm'
                                  as='select'
                                  // value={formData.os_cyl}
                                  onChange={(e) =>
                                    handleChange("os_cyl", e.target.value)
                                  }
                                  onInvalid={(e) => {
                                    e.target.setCustomValidity(
                                      "Please select a value for this field or please select 0 if choosing document upload."
                                    );
                                  }}
                                  onInput={(e) => {
                                    e.target.setCustomValidity("");
                                  }}
                                >
                                  <option value='' hidden>
                                    Select
                                  </option>
                                  {[...Array(40).keys()].map((x) => {
                                    const value = -9.5 + x * 0.5; // Calculate the value

                                    if (value % 1 === 0) {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    } else {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    }
                                  })}
                                </Form.Select>
                              </Form.Group>
                              <Form.Group as={Col} xs='4'>
                                AXIS{" "}
                                <Form.Select
                                  required
                                  size='sm'
                                  as='select'
                                  // value={formData.os_axis}
                                  onChange={(e) =>
                                    handleChange("os_axis", e.target.value)
                                  }
                                  onInvalid={(e) => {
                                    e.target.setCustomValidity(
                                      "Please select a value for this field or please select 0 if choosing document upload."
                                    );
                                  }}
                                  onInput={(e) => {
                                    e.target.setCustomValidity("");
                                  }}
                                >
                                  <option value='' hidden>
                                    Select
                                  </option>
                                  {[...Array(40).keys()].map((x) => {
                                    const value = -9.5 + x * 0.5; // Calculate the value

                                    if (value % 1 === 0) {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    } else {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    }
                                  })}
                                </Form.Select>
                              </Form.Group>
                            </Row>
                          </ListGroupItem>
                          {Specification.prescriptionType === "Progressive" && (
                            <ListGroupItem>
                              <Form.Label as='legend'>Add Power (+)</Form.Label>
                              <Row>
                                <Form.Group as={Col} xs='4'>
                                  <Form.Select
                                    required
                                    size='sm'
                                    as='select'
                                    // value={formData.os_cyl}
                                    onChange={(e) =>
                                      handleChange("Add_Power", e.target.value)
                                    }
                                    onInvalid={(e) => {
                                      e.target.setCustomValidity(
                                        "Please select a value for this field or please select 0 if choosing document upload."
                                      );
                                    }}
                                    onInput={(e) => {
                                      e.target.setCustomValidity("");
                                    }}
                                  >
                                    <option value='' hidden>
                                      Select
                                    </option>
                                    {[
                                      0.0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5,
                                      1.75, 2.0, 2.25, 2.5, 2.75, 3.0,
                                    ].map((value) => (
                                      <option
                                        key={value}
                                        value={value.toFixed(2)}
                                      >
                                        {value.toFixed(2)}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </Row>
                            </ListGroupItem>
                          )}
                          <ListGroupItem>
                            <Form.Label as='legend'>
                              Pullipary Distance (PD){" "}
                            </Form.Label>
                            <Row>
                              <Form.Group as={Col} xs='6'>
                                {" "}
                                {["radio"].map((type) => (
                                  <div
                                    key={`default-${type}`}
                                    style={{
                                      backgroundColor: "#d9d9d9",
                                      marginBottom: "3px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <Form.Check
                                      required
                                      inline
                                      label='Single PD'
                                      value={"Single"}
                                      name='group1'
                                      type={type}
                                      id={`default-${type}`}
                                      onChange={(e) =>
                                        handleChange("pd_type", e.target.value)
                                      }
                                    />
                                    <Form.Check
                                      required
                                      inline
                                      label='Dual PD'
                                      value={"Dual"}
                                      name='group1'
                                      type={type}
                                      id={`default-${type}`}
                                      onChange={(e) =>
                                        handleChange("pd_type", e.target.value)
                                      }
                                    />
                                    <Form.Check
                                      required
                                      inline
                                      label='None'
                                      value={"None"}
                                      name='group1'
                                      type={type}
                                      id={`default-${type}`}
                                      onChange={(e) =>
                                        handleChange("pd_type", e.target.value)
                                      }
                                    />
                                  </div>
                                ))}
                              </Form.Group>
                              <Form.Group as={Col} xs='6'>
                                <Form.Select
                                  required
                                  inline
                                  size='sm'
                                  as='select'
                                  onChange={(e) =>
                                    handleChange("pd_value", e.target.value)
                                  }
                                  onInvalid={(e) => {
                                    e.target.setCustomValidity(
                                      "Please select a value for this field or please select 0 and None if choosing document upload."
                                    );
                                  }}
                                  onInput={(e) => {
                                    e.target.setCustomValidity("");
                                  }}
                                >
                                  <option value='' hidden>
                                    Select
                                  </option>
                                  {[...Array(40).keys()].map((x) => {
                                    const value = -9.5 + x * 0.5; // Calculate the value

                                    if (value % 1 === 0) {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    } else {
                                      return (
                                        <option key={value} value={value}>
                                          {value.toFixed(1)}
                                        </option>
                                      );
                                    }
                                  })}
                                </Form.Select>
                              </Form.Group>
                            </Row>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Form.Label>
                              Upload Your Prescription for Cross Checking (above
                              +/- 10 Ds )
                            </Form.Label>
                            <Form.Group>
                              <Form.Control
                                type='file'
                                id='uploadedPrescription'
                                accept='.jpg, .jpeg, .png, .pdf'
                                onChange={uploadPrescriptionHandler}
                              />
                            </Form.Group>
                          </ListGroupItem>
                          <ListGroupItem className='d-flex justify-content-start'>
                            <Button
                              className='Psbutton shadow btn-light rounded'
                              // onClick={Handleform4}
                              type='submit'
                            >
                              Save Changes and Continue
                            </Button>
                          </ListGroupItem>
                        </ListGroup>
                      </Form>
                    </Modal.Body>
                  </Col>
                );
              case "4":
                return (
                  <Col className='shadow' md={8}>
                    <ProgressBar
                      className=' Fpro shadow'
                      variant='info'
                      animated
                      now={100}
                    />
                    <Modal.Header closeButton>
                      <Button
                        onClick={handleBack2}
                        size='sm'
                        className='btn-light Psbutton shadow'
                      >
                        <i className='fa fa-arrow-left' aria-hidden='true'></i>
                      </Button>
                    </Modal.Header>
                    <Modal.Title className='text-center'>
                      Check and Purchase
                    </Modal.Title>
                    <Modal.Body>
                      <ListGroup variant='flush'>
                        <ListGroupItem>
                          <Row>
                            <Col>Prescription:</Col>
                            <Col>{Specification.prescriptionType}</Col>
                          </Row>
                        </ListGroupItem>

                        <ListGroup.Item>
                          <Row>
                            <Col>Status:</Col>
                            <Col>
                              {product.countInStock > 0
                                ? "In Stock"
                                : "Out Of Stock"}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>Qty</Col>
                              <Col>
                                <Form.Control
                                  size='sm'
                                  as='select'
                                  value={Specification.qty}
                                  onChange={(e) =>
                                    setSpecification({
                                      ...Specification,
                                      qty: e.target.value,
                                    })
                                  }
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )}
                        <ListGroupItem>
                          <Row>
                            <Col> Contact Lens Price:</Col>

                            <Col>${product.price}</Col>
                          </Row>
                        </ListGroupItem>

                        <ListGroup.Item>
                          <Button
                            onClick={addToCartHandler}
                            className='Psbutton btn-light rounded shadow'
                            type='button'
                            disabled={product.countInStock === 0}
                          >
                            Add To Cart
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Modal.Body>
                  </Col>
                );

              default:
                return (
                  <Col>
                    Sorry some Error is there, The technical team is looking
                    into it.
                  </Col>
                );
            }
          })()}
        </Row>
      </Modal>
    </>
  );
}

export default ContactlensModal;
