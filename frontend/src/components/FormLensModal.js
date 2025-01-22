import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
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
  Table,
} from "react-bootstrap";

function FormLens({
  type,
  setType,
  product,
  addToCartHandler,
  setSpecification,
  Specification,
}) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const [show, setShow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [Id, SetId] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [isOnlyFrame, setIsOnlyFrame] = useState(false);
  const [selectedLens, setSelectedLens] = useState({});

  // fetching the frame lens that will be selected later on
  let framebox = [];
  framebox = frameproducts(product.frameIds);
  function frameproducts(frameIds) {
    // console.log(frameIds);
    if (!frameIds) {
      return [];
    }
    const data = products.filter((product) => frameIds.includes(product._id));
    // console.log("here is the data", data);
    return data;
  }

  // console.log("here is the similar products", similarbox);

  useEffect(() => {
    dispatch(listProducts());
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
  }, [dispatch]);
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
  const lensDataArray = [
    {
      id: "1",
      lensname: "Clear 1",
      price: 39.99,
      logo: "lens_logo_1.png",
      lensDesc:
        "Scratch-resistant, anti-reflective lenses that block 100% of UV rays",
      lensTable: [
        { column1: "Feature 1", column2: "Value 2" },
        { column1: "Feature 2", column2: "Value 5" },
        { column1: "Feature 3", column2: "Value 5" },
        { column1: "Feature 4", column2: true },
        { column1: "Feature 5", column2: true },
        { column1: "Feature 6", column2: true },
        { column1: "Feature 7", column2: true },
        { column1: "Both Side Anti Reflective Coating", column2: false },
        { column1: "Feature 9", column2: "Value 5" },
        // Add more rows as needed
      ],
    },
  ];

  const handleBuyFrame = () => {
    setShow(true);
    setIsOnlyFrame(true);
    setSpecification({ ...Specification, onlyFrame: true });
    setType("5");
  };
  const handleShow = () => {
    setShow(true);
  };
  // const Handleform1 = (value) => {
  //   setSpecification({ ...Specification, frame: value });
  //   setType("2");
  // };
  const Handleform2 = (value) => {
    setSpecification({ ...Specification, prescriptionType: value });
    setType("3");
  };
  const Handleform3 = (value) => {
    const parts = value.split("?");
    setSpecification({
      ...Specification,
      lens: parts[0],
      lensprice: Number(parts[1]),
    });
    const Lens = framebox.find((lens) => lens._id === parts[0]);

    setSelectedLens(Lens);
    setType("4");
  };
  const uploadPrescriptionHandler = async (e) => {
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append("PrescriptionImage", file);
    console.log(formData1);

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
      // /uploads\PrescriptionImage-1715725887109.png data that we are getting
      // const ImageId = data.match(/\d+/)[0];
      const ImageId = data.substring(data.lastIndexOf("-") + 1);
      // console.log(ImageId);
      // console.log(data);
      setFormData({
        ...formData,
        PrescriptionImage: ImageId,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const Handleform4 = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    } else {
      setSpecification(() => ({
        ...Specification,
        ManualValues: formData,
      }));
      setType("5");
    }
  };
  const handleClose = () => {
    setIsOnlyFrame(false);
    setType("2");
    setSpecification({
      ...Specification,
      // frame: "",
      prescriptionType: " ",
      qty: 1,
      onlyFrame: false,
      lens: " ",
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
  // const handleBack1 = () => {
  //   setType("1");
  // };
  const handleBack2 = () => {
    setType("2");
  };
  const handleBack3 = () => {
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
  const handleBack4 = () => {
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
    setType("4");
  };
  return (
    <>
      <Button
        type='button'
        onClick={handleShow}
        disabled={product.countInStock === 0}
        className=' Psbutton shadow btn-light'
      >
        Select Lenses/Buy
      </Button>
      <Button
        onClick={handleBuyFrame}
        type='button'
        disabled={product.countInStock === 0}
        style={{ border: "1px solid #2f99d1", borderRadius: "2.5rem" }}
        className='shadow btn-light'
      >
        Buy Frame @ {product.price}
      </Button>

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
              // removed beacuse starting sab individual product ka f
              // case "1":
              //   return (
              //     <Col className='shadow' md={8}>
              //       <ProgressBar
              //         className=' Fpro shadow'
              //         variant='info'
              //         animated
              //         now={20}
              //       />
              //       <Modal.Header closeButton>
              //         <Button
              //           onClick={handleClose}
              //           size='sm'
              //           className='btn-light Psbutton shadow'
              //         >
              //           <i className='fa fa-arrow-left' aria-hidden='true'></i>
              //         </Button>
              //       </Modal.Header>

              //       <Modal.Title className='text-center'>
              //         Select frame Properties
              //       </Modal.Title>
              //       <Modal.Body>
              //         <ListGroup variant='flush'>
              //           <ListGroup.Item>
              //             <Button
              //               size='sm'
              //               value='wide'
              //               onClick={() => {
              //                 Handleform1("wide");
              //               }}
              //               className='Psbutton shadow btn-light'
              //             >
              //               Wide
              //             </Button>
              //             <p className='my-2 FP'>
              //               {" "}
              //               The width of this type of frame would be for broad
              //               faces
              //             </p>
              //           </ListGroup.Item>
              //           <ListGroup.Item>
              //             <Button
              //               size='sm'
              //               onClick={() => {
              //                 Handleform1("medium");
              //               }}
              //               value='medium'
              //               className='Psbutton shadow btn-light'
              //             >
              //               Medium
              //             </Button>
              //             <p className='my-2 FP'>
              //               For our lovely customer who have a average-sized
              //               face
              //             </p>
              //           </ListGroup.Item>
              //           <ListGroup.Item>
              //             <Button
              //               size='sm'
              //               value='small'
              //               onClick={() => {
              //                 Handleform1("small");
              //               }}
              //               className='Psbutton shadow btn-light'
              //             >
              //               Small
              //             </Button>
              //             <p className='my-2 FP'>
              //               Making our small faced customer happy with new style
              //             </p>
              //           </ListGroup.Item>
              //           {product && (
              //             <ListGroup.Item>
              //               <Button
              //                 size='sm'
              //                 onClick={() => Handleform1("metal")}
              //                 value='metal'
              //                 className='Psbutton shadow btn-light'
              //               >
              //                 Metal
              //               </Button>
              //               <p className='my-2 FP'>
              //                 Medium sized metal frames that provides a composed
              //                 look
              //               </p>
              //             </ListGroup.Item>
              //           )}

              //           <ListGroup.Item>
              //             <h6 className='my-2'>
              //               Please choose the frame depending upon face size so
              //               it fits you perfectly. See the Size Guide for
              //               Clarity.
              //             </h6>
              //           </ListGroup.Item>
              //         </ListGroup>
              //       </Modal.Body>
              //     </Col>
              //   );
              case "2":
                return (
                  <Col className='shadow' md={8}>
                    <ProgressBar
                      className=' Fpro shadow'
                      variant='info'
                      animated
                      now={25}
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
                              Handleform2("Single-Vision");
                            }}
                            className='Psbutton shadow btn-light'
                          >
                            Single-Vision/Powered Eyeglasses
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
                              Handleform2("Zero-Power-Computer-Lens");
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
                              Handleform2("Progressive");
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
                  <>
                    {isExpanded && (
                      <Col
                        md={2}
                        className='sliding-column d-flex flex-column justify-content-center'
                      >
                        <h4 className='text-center'>Lens Properties</h4>
                        <Table striped bordered hover variant='dark'>
                          <tbody>
                            {lensDataArray[0].lensTable.map((row, index) => (
                              <tr key={index}>
                                <td
                                  className='text-center'
                                  style={{ verticalAlign: "middle" }}
                                >
                                  {row.column1}
                                </td>
                                <td
                                  className='text-center'
                                  style={{ verticalAlign: "middle" }}
                                >
                                  {typeof row.column2 === "boolean"
                                    ? row.column2
                                      ? "✅"
                                      : "❌"
                                    : row.column2}
                                </td>
                              </tr>
                            ))}
                            {/*  ye table ayega jab framelens mein lens specification daal denge tab catalogue se ayega */}
                            {/* {framebox
                              .filter((product) => product._id === Id)
                              .map((filteredProduct) =>
                                filteredProduct.lensTable.map((row, index) => (
                                  <tr key={index}>
                                    <td
                                      className='text-center'
                                      style={{ verticalAlign: "middle" }}
                                    >
                                      {row.column1}
                                    </td>
                                    <td
                                      className='text-center'
                                      style={{ verticalAlign: "middle" }}
                                    >
                                      {typeof row.column2 === "boolean"
                                        ? row.column2
                                          ? "✅"
                                          : "❌"
                                        : row.column2}
                                    </td>
                                  </tr>
                                ))
                              )} */}
                          </tbody>
                        </Table>
                      </Col>
                    )}

                    <Col className='shadow' md={isExpanded ? 6 : 8}>
                      <ProgressBar
                        className=' Fpro shadow'
                        variant='info'
                        animated
                        now={50}
                      />
                      <Modal.Header closeButton>
                        <Button
                          onClick={handleBack2}
                          size='sm'
                          className='btn-light Psbutton shadow'
                        >
                          <i
                            className='fa fa-arrow-left'
                            aria-hidden='true'
                          ></i>
                        </Button>
                      </Modal.Header>

                      <Modal.Title className='text-center'>
                        Select Lens
                      </Modal.Title>
                      <Modal.Body>
                        {framebox.length === 0 ? (
                          <ListGroup.Item>
                            <Row>
                              <h3>
                                Sorry, this product Does not have Frame Lens.
                                Please Choose Frame Only option
                              </h3>
                            </Row>
                          </ListGroup.Item>
                        ) : (
                          <ListGroup variant='flush'>
                            {framebox.map((lensdata) => (
                              <ListGroup.Item>
                                <Row>
                                  <Col md={3}>
                                    <Button
                                      className='btn-light Psbutton shadow'
                                      style={{ verticalAlign: "middle" }}
                                      size='sm'
                                      onClick={() => {
                                        setIsExpanded(!isExpanded);
                                        SetId(lensdata._id);
                                      }}
                                    >
                                      {isExpanded ? (
                                        <i class='rotated-icon fa-solid fa-angles-left'></i>
                                      ) : (
                                        <i class='fa-solid fa-angles-left'></i>
                                      )}
                                    </Button>
                                    <Button
                                      size='sm'
                                      onClick={() => {
                                        Handleform3(
                                          `${lensdata._id}?${lensdata.price}`
                                        );
                                      }}
                                      className='Psbutton shadow btn-light ms-1'
                                    >
                                      Select this lens
                                    </Button>
                                  </Col>
                                  <Col md={3}>{lensdata.name}</Col>
                                  <Col md={3}>{lensdata.price}</Col>

                                  <Col md={1}>
                                    <Image
                                      src={lensdata.image}
                                      alt={product.name}
                                      fluid
                                      rounded
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  <p className='my-2 FP'>
                                    {lensdata.description}
                                  </p>
                                </Row>
                              </ListGroup.Item>
                            ))}

                            <ListGroup.Item>
                              <h6 className='my-2 FP'>
                                Please choose the lens depending upon needs,
                                budget face size so it fits you perfectly
                              </h6>
                            </ListGroup.Item>
                          </ListGroup>
                        )}
                      </Modal.Body>
                    </Col>
                  </>
                );
              case "4":
                return (
                  <Col className='shadow' md={8}>
                    <ProgressBar
                      className=' Fpro shadow'
                      variant='info'
                      animated
                      now={75}
                    />

                    <Modal.Header closeButton>
                      <Button
                        onClick={handleBack3}
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
                      <Form onSubmit={Handleform4}>
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
                                  size='sm'
                                  as='select'
                                  // value={formData.os_axis}
                                  onChange={(e) =>
                                    handleChange("os_axis", e.target.value)
                                  }
                                  required
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
                                    // style={{
                                    //   backgroundColor: "rgba(0, 0, 0, 0.2)",
                                    //   // borderColor: "#e62315",
                                    //   // borderBlockColor: "#e62315",
                                    // }}
                                    // className='mb-3 text-center'
                                    style={{
                                      backgroundColor: "#d9d9d9",
                                      marginBottom: "3px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <Form.Check
                                      required
                                      inline
                                      // style={{
                                      //   backgroundColor: "rgba(0, 0, 0, 0.1)",
                                      //   // borderColor: "#e62315",
                                      //   // borderBlockColor: "#e62315",
                                      // }}
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
                                      // style={{
                                      //   backgroundColor: "rgba(0, 0, 0, 0.1)",
                                      //   // borderColor: "#e62315",
                                      //   // borderBlockColor: "#e62315",
                                      // }}
                                      label='Dual PD'
                                      value={"Dual"}
                                      name='group1'
                                      type={type}
                                      // id={`inline-${type}-2`}
                                      id={`default-${type}`}
                                      onChange={(e) =>
                                        handleChange("pd_type", e.target.value)
                                      }
                                    />
                                    <Form.Check
                                      required
                                      inline
                                      // style={{
                                      //   backgroundColor: "rgba(0, 0, 0, 0.1)",
                                      //   // borderColor: "#e62315",
                                      //   // borderBlockColor: "#e62315",
                                      // }}
                                      label='None'
                                      value={"None"}
                                      name='group1'
                                      type={type}
                                      // id={`inline-${type}-2`}
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
                                  // value={formData.pd_value}
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
                                    Select PD (in cm)
                                  </option>
                                  {[...Array(21).keys()].map((x) => {
                                    const value = 0 + x * 5; // Calculate the value starting from 10 to 100

                                    return (
                                      <option key={value} value={value}>
                                        {value.toFixed(1)}
                                      </option>
                                    );
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
              case "5":
                return (
                  <Col className='shadow' md={8}>
                    <ProgressBar
                      className=' Fpro shadow'
                      variant='info'
                      animated
                      now={100}
                    />
                    <Modal.Header closeButton>
                      {isOnlyFrame ? (
                        ""
                      ) : (
                        <Button
                          onClick={handleBack4}
                          size='sm'
                          className='btn-light Psbutton shadow'
                        >
                          <i
                            className='fa fa-arrow-left'
                            aria-hidden='true'
                          ></i>
                        </Button>
                      )}
                    </Modal.Header>
                    <Modal.Title className='text-center'>
                      Check and Purchase
                    </Modal.Title>
                    <Modal.Body>
                      <ListGroup variant='flush'>
                        {/* <ListGroupItem>
                          <Row>
                            <Col>Frame:</Col>
                            <Col>{Specification.frame}</Col>
                          </Row>
                        </ListGroupItem> */}

                        <ListGroupItem>
                          <Row>
                            <Col>Prescription:</Col>
                            <Col>
                              {isOnlyFrame
                                ? "Frame includes no power lens"
                                : Specification.prescriptionType}
                            </Col>
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
                            <Col> Frame Price:</Col>

                            <Col>${product.price}</Col>
                          </Row>
                        </ListGroupItem>
                        {!isOnlyFrame && (
                          <ListGroupItem>
                            <Row>
                              <Col> Lens Name:</Col>

                              <Col>{selectedLens.name}</Col>
                            </Row>
                            <Row>
                              <Col> Lens Price:</Col>

                              <Col>${selectedLens.price}</Col>
                            </Row>
                          </ListGroupItem>
                        )}

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

export default FormLens;
