import { useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FaChalkboardTeacher, FaUserPlus, FaSave, FaTimes } from 'react-icons/fa';
import axios from "axios";


function AddTeacher() {

  const navigate = useNavigate();

  const { id } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();



  async function onSubmit(formData) {
    try {
      let response;
      if (id) {
        response = await axios.put(
          `https://student-management-system-api-jczi.onrender.com/teachers/${id}`, formData);
      } else {
        response = await axios.post(
          "https://student-management-system-api-jczi.onrender.com/teachers", formData);
      }
      console.log(response.data);
      navigate("/Teachers")
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    async function getTeacher() {
      try {
        const response = await axios.get(`https://student-management-system-api-jczi.onrender.com/teachers/${id}`);
        reset(response.data.teachers);
      } catch (error) {
        console.log(error);
      }
    }
    if (id) {
      getTeacher();
    }
  }, [id, reset]);



  return (
    <Container fluid className="p-4 p-xl-5 bg-light min-vh-100">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold text-dark mb-1 d-flex align-items-center">
            {id ? <FaChalkboardTeacher className="me-2 text-primary" /> : <FaUserPlus className="me-2 text-primary" />}
            {id ? "Edit Teacher Record" : "Add New Teacher"}
          </h3>
          <p className="text-muted mb-0 small">
            {id ? "Update the details of the selected teacher below." : "Enter the details to register a new teacher."}
          </p>
        </div>
      </div>
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4 p-xl-5">
          <Form onSubmit={handleSubmit(onSubmit)}>

            <h5 className="fw-bold mb-4 text-primary border-bottom pb-2">Professional Information</h5>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Teacher ID <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Teacher ID"
                    isInvalid={!!errors.teacherID}
                    {...register("teacherID", { required: "ID is required" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.teacherID?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Teacher Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    isInvalid={!!errors.teacherName}
                    {...register("teacherName", { required: "Name is required" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.teacherName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Subject <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Mathematics"
                    isInvalid={!!errors.subject}
                    {...register("subject", { required: "Subject is required" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.subject?.message}
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
            <h5 className="fw-bold mb-4 text-primary border-bottom pb-2 mt-5">Contact Details & Photo</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Phone Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Phone Number"
                    isInvalid={!!errors.phone}
                    {...register("phone", { required: "Phone is required" })}
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
                    {...register("email", { required: "Email is required" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Photo URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    {...register("photo")}
                  />
                  <Form.Text className="text-muted small">Provide an image link to show on the profile card.</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Experience <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="e.g., 5 years of teaching Mathematics"
                    isInvalid={!!errors.experience}
                    {...register("experience", { required: "Experience is required" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.experience?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex gap-3 justify-content-end mt-5 pt-3 border-top">
              <Button
                variant="light"
                className="px-4 py-2 fw-semibold text-secondary rounded-pill border"
                onClick={() => navigate("/Teachers")}
              >
                <FaTimes className="me-2" /> Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="px-4 py-2 fw-semibold rounded-pill shadow-sm"
              >
                <FaSave className="me-2" /> {id ? "Update Teacher" : "Save Teacher"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AddTeacher;
