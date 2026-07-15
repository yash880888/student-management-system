import { useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserEdit, FaUserPlus, FaSave, FaTimes } from 'react-icons/fa';
import axios from "axios";
// import { useState } from 'react';



function AddStudent() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { id } = useParams();

  const navigate = useNavigate();

  async function onSubmit(formData) {
    try {
      let response;
      if (id) {
        response = await axios.put(
          `http://localhost:3000/students/${id}`, formData);
      } else {
        response = await axios.post(
          "http://localhost:3000/students", formData);
      }
      console.log(response.data.students);
      navigate("/Student")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    async function getStudent() {
      try {
        const response = await axios.get(`http://localhost:3000/students/${id}`);
        response.data.students.birthdate = response.data.students.birthdate?.split("T")[0];
        response.data.students.admissionDate = response.data.students.admissionDate?.split("T")[0];
        reset(response.data.students);
      } catch (error) {
        console.log(error);
      }
    }
    if (id) {
      getStudent();

    }
  }, [id, reset]);






  return (
      <Container fluid className="p-4 p-xl-5 bg-light min-vh-100">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold text-dark mb-1 d-flex align-items-center">
            {id ? <FaUserEdit className="me-2 text-primary" /> : <FaUserPlus className="me-2 text-primary" />}
            {id ? "Edit Student Record" : "Add New Student"}
          </h3>
          <p className="text-muted mb-0 small">
            {id ? "Update the details of the selected student below." : "Enter the details to register a new student."}
          </p>
        </div>
      </div>
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4 p-xl-5">
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            <h5 className="fw-bold mb-4 text-primary border-bottom pb-2">Personal Information</h5>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Student ID <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Student ID"
                    isInvalid={!!errors.studentID}
                    {...register("studentID", { required: "Please enter student ID" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.studentID?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Student Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    isInvalid={!!errors.studentName}
                    {...register("studentName", { required: "Please enter student name" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.studentName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Father's Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Father's Name"
                    isInvalid={!!errors.fatherName}
                    {...register("fatherName", { required: "Please enter father name" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fatherName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small d-block">Gender <span className="text-danger">*</span></Form.Label>
                  <div className="d-flex gap-4 mt-2">
                    <Form.Check 
                      type="radio"
                      label="Male"
                      value="Male"
                      id="genderMale"
                      inline
                      isInvalid={!!errors.gender}
                      {...register("gender", { required: "Please select a gender" })}
                    />
                    <Form.Check 
                      type="radio"
                      label="Female"
                      value="Female"
                      id="genderFemale"
                      inline
                      isInvalid={!!errors.gender}
                      {...register("gender", { required: "Please select a gender" })}
                    />
                  </div>
                  {errors.gender && <div className="text-danger small mt-1 d-block">{errors.gender.message}</div>}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Date of Birth <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="date"
                    isInvalid={!!errors.birthdate}
                    {...register("birthdate", { required: "Please select birthdate" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.birthdate?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <h5 className="fw-bold mb-4 text-primary border-bottom pb-2 mt-5">Contact & Academic Details</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Phone Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Phone Number"
                    isInvalid={!!errors.phone}
                    {...register("phone", { required: "Please enter phone number" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Email Address <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    isInvalid={!!errors.email}
                    {...register("email", { required: "Please enter email" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Course <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Enrolled Course"
                    isInvalid={!!errors.course}
                    {...register("course", { required: "Please enter course" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.course?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Admission Date <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="date"
                    isInvalid={!!errors.admissionDate}
                    {...register("admissionDate", { required: "Please select admission date" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.admissionDate?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Address <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Complete Address"
                    isInvalid={!!errors.address}
                    {...register("address", { required: "Please enter address" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex gap-3 justify-content-end mt-5 pt-3 border-top">
              <Button 
                variant="light" 
                className="px-4 py-2 fw-semibold text-secondary rounded-pill border"
                onClick={() => navigate("/Student")}
              >
                <FaTimes className="me-2" /> Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit" 
                className="px-4 py-2 fw-semibold rounded-pill shadow-sm"
              >
                <FaSave className="me-2" /> {id ? "Update Student" : "Save Student"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AddStudent;