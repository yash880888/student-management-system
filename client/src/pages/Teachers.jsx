import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { FaSearch, FaUserPlus, FaEdit, FaTrash, FaExclamationCircle, FaUserTie, FaEnvelope, FaPhoneAlt, FaBriefcase } from 'react-icons/fa';
import axios from "axios";
import LoadingSpinner from "../components/common/LoadingSpinner";

function Teachers() {

  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleSearch(e) {
    setSearch(e.target.value)
  }

  const filterdTeachers = teachers.filter((item) => {
    return (
      item.teacherName.toLowerCase().includes(search.toLowerCase().trim()) ||
      item.teacherID.toString().toLowerCase().includes(search.toLowerCase().trim()) ||
      item.subject.toLowerCase().includes(search.toLowerCase().trim())
    )
  })
  const navigate = useNavigate();

  async function getTeacher() {
    try {
      setLoading(true);
      const response = await axios.get("http://https://student-management-system-api-jczi.onrender.com/teachers")
      setTeachers(response.data.teachers)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTeacher();
  }, [])



  async function deleteTeacher(id) {
    try {
      const response = await axios.delete(`http://https://student-management-system-api-jczi.onrender.com/teachers/${id}`)
      console.log(response);
      console.log(response.data.teachers);
      await getTeacher();
    } catch (error) {
      console.log(error);
    }
  }



  function goTeacher() {
    navigate("/Teachers/AddTeacher")
  }

  function goEdit(id) {
    navigate(`/Teachers/Edit/${id}`)
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Container fluid className="p-4 p-xl-5 bg-light min-vh-100">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <h3 className="fw-bold text-dark mb-1">Teachers Directory</h3>
            <p className="text-muted mb-0 small">Manage, view, and edit all teacher records</p>
          </div>
          <Button
            variant="primary"
            className="d-flex align-items-center px-4 py-2 rounded-pill shadow-sm fw-semibold"
            onClick={goTeacher}
          >
            <FaUserPlus className="me-2" /> Add New Teacher
          </Button>
        </div>
        <Row className="mb-5">
          <Col xs={12} md={6} lg={4}>
            <InputGroup className="shadow-sm rounded-pill overflow-hidden">
              <InputGroup.Text className="bg-white border-end-0 text-muted ps-4">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by name, ID, subject..."
                value={search}
                onChange={handleSearch}
                className="border-start-0 shadow-none py-2"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="g-4">
          {filterdTeachers.length === 0 ? (




            <Col xs={12}>
              <div className="text-center py-5 text-muted bg-white rounded-4 shadow-sm border-0 h-100 p-5">
                <FaExclamationCircle size={50} className="text-muted opacity-25 mb-3" />
                <h4 className="fw-bold text-dark">No teachers found</h4>
                <p className="mb-0">Try adjusting your search criteria or add a new teacher.</p>
              </div>
            </Col>
          ) : (
            filterdTeachers.map((item) => (

              <Col xs={12} sm={6} lg={4} xl={3} key={item.teacherID}>
                <Card className="h-100 border-0 shadow-sm rounded-4 text-center teacher-card transition-all">
                  <Card.Body className="p-4 pb-2">

                    <div className="mb-3 position-relative d-inline-block">
                      <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto overflow-hidden border border-2 border-primary border-opacity-25" style={{ width: '80px', height: '80px' }}>

                        {/* If a photo exists, show it. Otherwise, fallback to the generic icon! */}
                        {item.photo ? (
                          <img src={item.photo} alt={item.teacherName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <FaUserTie size={36} className="text-primary" />
                        )}

                      </div>
                      <Badge bg="success" className="position-absolute bottom-0 start-100 translate-middle border border-2 border-white rounded-circle p-2">
                        <span className="visually-hidden">Active</span>
                      </Badge>

                    </div>


                    <Card.Title className="fw-bold text-dark mb-1 fs-5">{item.teacherName}</Card.Title>
                    <Card.Subtitle className="mb-3">
                      <Badge bg="light" text="secondary" className="border px-3 py-2 rounded-pill fw-medium shadow-sm">
                        {item.subject}
                      </Badge>
                    </Card.Subtitle>

                    <div className="text-start mt-4 px-2">
                      <div className="d-flex align-items-center mb-2 small text-muted">
                        <FaEnvelope className="me-3 text-secondary" />
                        <span className="text-truncate">{item.email}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2 small text-muted">
                        <FaPhoneAlt className="me-3 text-secondary" />
                        <span>{item.phone}</span>
                      </div>
                      <div className="d-flex align-items-center small text-muted">
                        <FaBriefcase className="me-3 text-secondary" />
                        <span>{item.experience}</span>
                      </div>
                    </div>
                  </Card.Body>

                  <Card.Footer className="bg-transparent border-0 p-4 pt-3 d-flex gap-2">
                    <Button
                      variant="light"
                      className="flex-grow-1 text-primary bg-primary bg-opacity-10 border-0 fw-semibold rounded-pill py-2 custom-icon-btn"
                      onClick={() => goEdit(item.teacherID)}
                    >
                      <FaEdit className="me-1 mb-1" /> Edit
                    </Button>
                    <Button
                      variant="light"
                      className="flex-grow-1 text-danger bg-danger bg-opacity-10 border-0 fw-semibold rounded-pill py-2 custom-icon-btn"
                      onClick={() => deleteTeacher(item.teacherID)}
                    >
                      <FaTrash className="me-1 mb-1" /> Delete
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  )
}
export default Teachers;