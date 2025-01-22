import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const PrescriptionImage = ({ data }) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");

  useEffect(() => {
    //   console.log(imageID);
    console.log(data);
    const parts = data.split(".");
    setType(parts[1]);
  }, [data]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fileUrl = `../../uploads/PrescriptionImage-${data}`;
  console.log(fileUrl);

  let modalContent;

  if (type === "jpeg" || type === "png" || type === "jpg") {
    modalContent = <Image src={fileUrl} fluid />;
  } else if (type === "pdf") {
    modalContent = (
      <DocViewer
        documents={[
          {
            uri: fileUrl,
          },
        ]}
        pluginRenderers={DocViewerRenderers}
      />
    );
  } else {
    modalContent = <p>Unsupported file type</p>;
  }

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
          class='fa-solid fa-file'
        ></i>
        Prescription
      </Button>

      <Modal
        show={show}
        backdrop='static'
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span style={{ fontWeight: "bold" }}>Uploaded Prescription</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
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
};

export default PrescriptionImage;
