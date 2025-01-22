import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OtpInput from "react-otp-input";
import axios from "axios";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const VerifyOtp = ({ email, setOTPsuccess }) => {
  const [show, setShow] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      generateAndSendOtp();
    }
  }, [show]);

  const generateAndSendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/email/generate-otp", { email });
      setGeneratedOtp(response.data.otp);
      toast.success("OTP sent successfully to your email!");
    } catch (error) {
      console.error("Error generating OTP:", error);
      setError(error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setOtpInput("");
    setError(null);
  };

  const handleShow = () => setShow(true);

  const handleVerifyOtp = () => {
    if (otpInput === generatedOtp) {
      setOTPsuccess(true);
      handleClose();
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <>
      <Button variant='primary' className='my-3' onClick={handleShow}>
        Proceed
      </Button>

      <Modal show={show} backdrop='static' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className='text-center'>
              <Loader />
              <p className='mt-2'>Sending OTP to your email...</p>
            </div>
          ) : error ? (
            <div className='alert alert-danger' role='alert'>
              {error.message}
            </div>
          ) : (
            <>
              <p>Please enter the 6-digit OTP sent to your email.</p>
              <OtpInput
                value={otpInput}
                onChange={setOtpInput}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 0.5rem",
                  fontSize: "1.5rem",
                  borderRadius: "4px",
                  border: "1px solid rgba(0,0,0,0.3)",
                }}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={handleVerifyOtp}
            disabled={loading || error || otpInput.length !== 6}
          >
            Verify OTP
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VerifyOtp;
