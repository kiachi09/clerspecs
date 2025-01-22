import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ListGroup, Form, ListGroupItem, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPhotosScreen() {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [loading, setloading] = useState(false);
  const uploadScreenPic0Handler = async (e) => {
    let value = 0;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success(" ScreenPic0 Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic1Handler = async (e) => {
    let value = 1;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
      }
      toast.success(" ScreenPic1 Upload completed!");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic2Handler = async (e) => {
    let value = 2;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success(" ScreenPic2  Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic3Handler = async (e) => {
    let value = 3;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success(" ScreenPic3 Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic4Handler = async (e) => {
    let value = 4;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success("  ScreenPic4  Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic5Handler = async (e) => {
    let value = 5;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success(" ScreenPic5 Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic6Handler = async (e) => {
    let value = 6;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success(" ScreenPic6 Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic7Handler = async (e) => {
    let value = 7;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success(" ScreenPic7 Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic8Handler = async (e) => {
    let value = 8;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success("ScreenPic8  Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic9Handler = async (e) => {
    let value = 9;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success(" ScreenPic9 Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic10Handler = async (e) => {
    let value = 10;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    // let fieldNameForFile;
    // for (const [key, value] of formData1.entries()) {
    //   if (value === file) {
    //     fieldNameForFile = key;
    //     break;
    //   }
    // }

    // Log the field name
    // console.log("Field Name:", fieldNameForFile);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success(" ScreenPic10 Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic11Handler = async (e) => {
    let value = 11;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success(" ScreenPic11 Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic12Handler = async (e) => {
    let value = 12;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success(" ScreenPic11 Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  const uploadScreenPic13Handler = async (e) => {
    let value = 13;
    setloading(true);
    const file = e.target.files[0];
    const formData1 = new FormData();
    formData1.append(`ScreenPic${value}`, file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/staticupload/${value}`,
        formData1,
        config
      );
      if (data) {
        setloading(false);
        toast.success(" ScreenPic11 Upload completed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };
  return (
    <>
      <ToastContainer />
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <ListGroup style={{ marginTop: "5rem" }}>
          <Row>
            <Col md={6}>
              <Link to='/' className='btn btn-light my-3'>
                Go Back
              </Link>
            </Col>
            <Col md={6}>
              <h1 className='text-start'>
                Add photos to different parts of Clerspecs (.jpg files only){" "}
              </h1>
            </Col>
          </Row>

          <ListGroupItem>
            <h4>
              This Photo corresponds to Homepage carousel picture (1200px by 665
              px)
            </h4>
            <Form.Label>Upload/Change Your ScreenPic0</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic0'
                accept='.jpg'
                onChange={uploadScreenPic0Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds to Homepage picture 1 (1200px by 400 px)
            </h4>
            <Form.Label>Upload/Change Your ScreenPic1</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic1'
                accept='.jpg'
                onChange={uploadScreenPic1Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds to Homepage picture 2 (1200px by 400 px)
            </h4>
            <Form.Label>Upload/Change Your ScreenPic2</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic2'
                accept='.jpg'
                onChange={uploadScreenPic2Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds to Homepage picture 3 (1200px by 400 px)
            </h4>
            <Form.Label>Upload/Change Your ScreenPic3</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic3'
                accept='.jpg'
                onChange={uploadScreenPic3Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds to EyeGlasses picture at the top (1100px by
              400px){" "}
            </h4>
            <Form.Label>Upload/Change Your ScreenPic4</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic4'
                accept='.jpg'
                onChange={uploadScreenPic4Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds to SunGlasses picture at the top (1200px by
              600px){" "}
            </h4>
            <Form.Label>Upload/Change Your ScreenPic5</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic5'
                accept='.jpg'
                onChange={uploadScreenPic5Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds to ContactLens picture at the top (1100px
              by 400px){" "}
            </h4>
            <Form.Label>Upload/Change Your ScreenPic6</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic6'
                accept='.jpg'
                onChange={uploadScreenPic6Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds to Size Guide given for eye and Sun Glasses
              (730px by 690px){" "}
            </h4>
            <Form.Label>Upload/Change Your ScreenPic7</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic7'
                accept='.jpg'
                onChange={uploadScreenPic7Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds to Instruction for Contact lens (865px by
              635px){" "}
            </h4>
            <Form.Label>Upload/Change Your ScreenPic8</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic8'
                accept='.jpg'
                onChange={uploadScreenPic8Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds features for clearspecs in individual
              product page (650px by 100px){" "}
            </h4>
            <Form.Label>Upload/Change Your ScreenPic9</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic9'
                accept='.jpg'
                onChange={uploadScreenPic9Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds logo of Clearspecs (exception .png file
              only) (120px by 50px){" "}
            </h4>
            <Form.Label>Upload/Change Your ScreenPic10</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic10'
                accept='.png'
                onChange={uploadScreenPic10Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds to the photo which has guide as a link in
              HomeScreen (1200px by 600px){" "}
            </h4>
            <Form.Label>Upload/Change Your ScreenPic11</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic11'
                accept='.jpg'
                onChange={uploadScreenPic11Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds to the photo in the About Us page (720px by
              450px){" "}
            </h4>
            <Form.Label>Upload/Change Your ScreenPic12</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic12'
                accept='.jpg'
                onChange={uploadScreenPic12Handler}
              />
            </Form.Group>
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              This Photo corresponds to the logo in the footer (450px by 200px){" "}
            </h4>
            <Form.Label>Upload/Change Your ScreenPic13</Form.Label>

            <Form.Group>
              <Form.Control
                type='file'
                id='uploadedScreenPic13'
                accept='.png'
                onChange={uploadScreenPic13Handler}
              />
            </Form.Group>
          </ListGroupItem>
        </ListGroup>
      )}
    </>
  );
}

export default AddPhotosScreen;
