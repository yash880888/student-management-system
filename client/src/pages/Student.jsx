import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Table, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaUserPlus, FaEdit, FaTrash, FaExclamationCircle } from 'react-icons/fa';
import axios from "axios";
import LoadingSpinner from "../components/common/LoadingSpinner";
function Student() {

  const [loading, setLoading] = useState(true);
  let [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  // const { id } = useParams();

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredStudents = students.filter((item) => {
    return (
      item.studentName.toLowerCase().includes(search.toLowerCase().trim()) ||
      item.fatherName.toLowerCase().includes(search.toLowerCase().trim()) ||
      item.course.toLowerCase().includes(search.toLowerCase().trim()) ||
      item.studentID.toString().includes(search.trim()) ||
      item.phone.toString().includes(search.trim())
    );
  })

  function goStudent() {
    navigate("/Student/AddStudent")
  }

  async function getStudent() {
    try {
      setLoading(true);
      const response = await axios.get("http://https://student-management-system-api-jczi.onrender.com/students")
      setStudents(response.data.students)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getStudent();
  }, [])

  function goEdit(id) {
    navigate(`/Student/Edit/${id}`)
  }

  async function deleteStudent(id) {
    try {
      const response = await axios.delete(`http://https://student-management-system-api-jczi.onrender.com/students/${id}`)
      console.log(response);
      await getStudent();
    } catch (error) {
      console.log(error);
    }
  }


  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Container fluid className="p-4 p-xl-5 bg-light min-vh-100">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <h3 className="fw-bold text-dark mb-1">Students Management</h3>
            <p className="text-muted mb-0 small">Manage, view, and edit all student records</p>
          </div>
          <Button
            variant="primary"
            className="d-flex align-items-center px-4 py-2 rounded-pill shadow-sm fw-semibold"
            onClick={goStudent}
          >
            <FaUserPlus className="me-2" /> Add New Student
          </Button>
        </div>
        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body className="p-4">
            <Row className="mb-4">
              <Col xs={12} md={6} lg={4}>
                <InputGroup className="shadow-sm rounded-pill overflow-hidden">
                  <InputGroup.Text className="bg-white border-end-0 text-muted ps-4">
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by name, ID, course..."
                    value={search}
                    onChange={handleSearch}
                    className="border-start-0 shadow-none py-2"
                  />
                </InputGroup>
              </Col>
            </Row>


            <Table responsive hover className="align-middle mb-0">
              <thead className="bg-light text-muted small text-uppercase" style={{ letterSpacing: '0.5px' }}>
                <tr>
                  <th className="px-4 py-3 border-0 rounded-start">Student ID</th>
                  <th className="py-3 border-0">Student Name</th>
                  <th className="py-3 border-0">Father's Name</th>
                  <th className="py-3 border-0">Course</th>
                  <th className="py-3 border-0">Gender</th>
                  <th className="py-3 border-0">Phone</th>
                  <th className="py-3 border-0">Admission Date</th>
                  <th className="px-4 py-3 border-0 rounded-end text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-5 text-muted">
                      <div className="d-flex flex-column align-items-center">
                        <FaExclamationCircle size={40} className="text-muted opacity-25 mb-3" />
                        <span className="fw-medium fs-5">No records found</span>
                        <span className="small">Try adjusting your search criteria.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((item) => (
                    <tr key={item.studentID}>
                      <td className="px-4 py-3">
                        <span className="badge bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-3 fw-bold">
                          #{item.studentID}
                        </span>
                      </td>
                      <td className="py-3 fw-semibold text-dark">{item.studentName}</td>
                      <td className="py-3 text-muted">{item.fatherName}</td>
                      <td className="py-3 text-muted">
                        <span className="bg-light px-2 py-1 rounded-2 border">{item.course}</span>
                      </td>
                      <td className="py-3 text-muted">{item.gender}</td>
                      <td className="py-3 text-muted">{item.phone}</td>
                      <td className="py-3 text-muted">  {new Date(item.admissionDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}</td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="light"
                          size="sm"
                          className="me-2 text-primary bg-primary bg-opacity-10 border-0 custom-icon-btn rounded-circle p-2"
                          onClick={() => goEdit(item.studentID)}
                          title="Edit Student"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="light"
                          size="sm"
                          className="text-danger bg-danger bg-opacity-10 border-0 custom-icon-btn rounded-circle p-2"
                          onClick={() => deleteStudent(item.studentID)}
                          title="Delete Student"
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default Student;