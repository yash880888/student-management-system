import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FaReceipt, FaSave, FaTimes, FaEdit, FaPrint, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import axios from "axios";

function Add() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    totalFees: 0,
    paidFees: 0,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  function pending() {
    return Number(data.totalFees) - Number(data.paidFees);
  }

  async function onsubmit(formData) {

    formData.pendingFees = pending();

    try {

      let response;

      if (id) {
        response = await axios.put(`http://https://student-management-system-api-jczi.onrender.com/fees/${id}`, formData);
      } else {
        response = await axios.post("http://https://student-management-system-api-jczi.onrender.com/fees", formData);
      }
      console.log(response.data);
      reset();
      navigate("/Fees");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    async function getFee() {

      try {

        const response = await axios.get(
          `http://https://student-management-system-api-jczi.onrender.com/fees/${id}`
        );

        setData({
          totalFees: response.data.fees.totalFees,
          paidFees: response.data.fees.paidFees,
        });

        reset(response.data.fees);

      } catch (error) {
        console.log(error);
      }

    }

    if (id) {
      getFee();
    }

  }, [id, reset]);

  return (
    <Container fluid className="p-4 p-xl-5 bg-light min-vh-100">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
        <div>
          <h3 className="fw-bold text-dark mb-1 d-flex align-items-center">
            {id ? <FaEdit className="me-2 text-primary" /> : <FaReceipt className="me-2 text-primary" />}
            {id ? "Edit Invoice" : "Generate Invoice"}
          </h3>
          <p className="text-muted mb-0 small">
            Fill in the details below to generate a unique digital fee receipt.
          </p>
        </div>
      </div>
      <Form onSubmit={handleSubmit(onsubmit)}>
        <Row className="g-4">

          {/* LEFT COLUMN - THE FORM */}
          <Col lg={7}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4 p-xl-5">
                <h5 className="fw-bold mb-4 text-primary border-bottom pb-2">Student Information</h5>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold small">Student ID <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter ID"
                        isInvalid={!!errors.id}
                        {...register("id", { required: "Please enter id" })}
                      />
                      <Form.Control.Feedback type="invalid">{errors.id?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold small">Student Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Student Name"
                        isInvalid={!!errors.studentName}
                        {...register("studentName", { required: "Please enter name" })}
                      />
                      <Form.Control.Feedback type="invalid">{errors.studentName?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold small">Course <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Course"
                        isInvalid={!!errors.course}
                        {...register("course", { required: "Please enter course" })}
                      />
                      <Form.Control.Feedback type="invalid">{errors.course?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <h5 className="fw-bold mb-4 text-primary border-bottom pb-2 mt-5">Payment Details</h5>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold small">Total Fees (₹) <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        isInvalid={!!errors.totalFees}
                        {...register("totalFees", {
                          required: "Please enter total fees",
                          onChange: (e) => setData((prev) => ({ ...prev, totalFees: e.target.value }))
                        })}
                      />
                      <Form.Control.Feedback type="invalid">{errors.totalFees?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold small">Paid Fees (₹) <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        isInvalid={!!errors.paidFees}
                        {...register("paidFees", {
                          required: "Please enter paid fees",
                          onChange: (e) => setData((prev) => ({ ...prev, paidFees: e.target.value }))
                        })}
                      />
                      <Form.Control.Feedback type="invalid">{errors.paidFees?.message}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          {/* RIGHT COLUMN - UNIQUE INVOICE PREVIEW */}
          <Col lg={5}>
            <Card className="border-0 shadow-lg rounded-4 h-100 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
              <div className="bg-primary text-white p-4 text-center" style={{ borderBottom: '4px dashed rgba(255,255,255,0.5)' }}>
                <FaPrint size={30} className="mb-2 opacity-75" />
                <h4 className="fw-bold mb-0">Live Receipt Preview</h4>
                <p className="mb-0 small opacity-75">Auto-updates as you type</p>
              </div>

              <Card.Body className="p-4 p-xl-5 d-flex flex-column justify-content-center">
                <div className="text-center mb-5">
                  <p className="text-muted fw-bold mb-1 text-uppercase tracking-wider">Total Amount Due</p>
                  <h1 className="display-4 fw-bolder text-dark mb-0">₹{Number(data.totalFees || 0).toLocaleString()}</h1>
                </div>
                <div className="bg-white rounded-4 p-4 shadow-sm mb-4 border">
                  <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                    <span className="text-muted fw-semibold">Amount Paid</span>
                    <span className="fw-bold text-success fs-5">₹{Number(data.paidFees || 0).toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted fw-semibold">Amount Pending</span>
                    <span className={`fw-bold fs-5 ${pending() > 0 ? 'text-danger' : 'text-success'}`}>
                      ₹{pending().toLocaleString()}
                    </span>
                  </div>

                  {/* Hidden pending input so react-hook-form can still register it without rendering an ugly input field */}
                  <input type="hidden" value={pending()} {...register("pendingFees")} />
                </div>
                <div className="text-center mt-auto">
                  {pending() === 0 && Number(data.totalFees) > 0 ? (
                    <Badge bg="success" className="px-4 py-3 rounded-pill fs-6 shadow-sm w-100 d-flex align-items-center justify-content-center">
                      <FaCheckCircle className="me-2" /> Fully Paid
                    </Badge>
                  ) : (
                    <Badge bg="warning" text="dark" className="px-4 py-3 rounded-pill fs-6 shadow-sm w-100 d-flex align-items-center justify-content-center">
                      <FaExclamationTriangle className="me-2" /> Outstanding Balance
                    </Badge>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* FLOATING ACTION BAR FOR SAVING */}
        <div className="bg-white p-4 rounded-4 shadow-sm border mt-4 d-flex justify-content-between align-items-center">
          <p className="mb-0 text-muted small fw-semibold">Please verify the receipt preview before saving.</p>
          <div className="d-flex gap-3">
            <Button
              variant="light"
              className="px-4 py-2 fw-semibold text-secondary rounded-pill border"
              onClick={() => navigate("/Fees")}
            >
              <FaTimes className="me-2" /> Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 fw-semibold rounded-pill shadow-sm"
            >
              <FaSave className="me-2" /> {id ? "Update Invoice" : "Save"}
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default Add;