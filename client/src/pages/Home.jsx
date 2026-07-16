import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import { FaUserGraduate, FaChalkboardTeacher, FaWallet, FaFileInvoiceDollar, FaUserSlash, FaReceipt } from "react-icons/fa";



function Home() {

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getStudents() {
    try {
      const response = await axios.get("https://student-management-system-api-jczi.onrender.com/students");
      setStudents(response.data.students);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTeachers() {
    try {
      const response = await axios.get("https://student-management-system-api-jczi.onrender.com/teachers");
      setTeachers(response.data.teachers);
    } catch (error) {
      console.log(error);
    }
  }
  async function getFees() {
    try {
      const response = await axios.get("https://student-management-system-api-jczi.onrender.com/fees");
      setFees(response.data.fees);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    async function fetchData() {

      setLoading(true);

      await Promise.all([
        getStudents(),
        getTeachers(),
        getFees()
      ]);

      setLoading(false);
    }

    fetchData();

  }, []);




  const totalPendingFees = fees.reduce((sum, item) => {
    return sum + Number(item.pendingFees);
  }, 0);

  const recentStudents = students.slice(-5).reverse();
  const recentFees = fees.slice(-5).reverse();
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>



      <Container fluid className="p-4 p-xl-5 bg-light min-vh-100">
        {/* Statistics Grid */}
        <Row className="g-4 mb-5">
          <Col xs={12} sm={6} xl={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="d-flex align-items-center p-4">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3 text-primary d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                  <FaUserGraduate size={24} />
                </div>
                <div>
                  <p className="text-muted mb-1 small fw-bold text-uppercase tracking-wider">Total Students</p>
                  <h3 className="mb-0 fw-bolder text-dark">{students.length}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} xl={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="d-flex align-items-center p-4">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3 text-success d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                  <FaChalkboardTeacher size={24} />
                </div>
                <div>
                  <p className="text-muted mb-1 small fw-bold text-uppercase tracking-wider">Total Teachers</p>
                  <h3 className="mb-0 fw-bolder text-dark">{teachers.length}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} xl={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="d-flex align-items-center p-4">
                <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3 text-warning d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                  <FaWallet size={24} />
                </div>
                <div>
                  <p className="text-muted mb-1 small fw-bold text-uppercase tracking-wider">Fee Records</p>
                  <h3 className="mb-0 fw-bolder text-dark">{fees.length}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} xl={3}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="d-flex align-items-center p-4">
                <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3 text-danger d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                  <FaFileInvoiceDollar size={24} />
                </div>
                <div>
                  <p className="text-muted mb-1 small fw-bold text-uppercase tracking-wider">Pending Fees</p>
                  <h3 className="mb-0 fw-bolder text-dark">₹{totalPendingFees.toLocaleString()}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Main Data Grid */}
        <Row className="g-4">
          {/* Recent Students */}
          <Col xs={12} lg={7}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Header className="bg-white border-0 pt-4 pb-3 px-4 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold text-dark">Recent Students</h5>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="rounded-pill px-4 fw-semibold shadow-sm"
                  onClick={() => navigate("/students")}
                >
                  View All Students
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="align-middle mb-0">
                  <thead className="bg-light text-muted small text-uppercase">
                    <tr>
                      <th className="px-4 py-3 border-0">Student ID</th>
                      <th className="py-3 border-0">Student Name</th>
                      <th className="py-3 border-0">Course</th>
                      <th className="px-4 py-3 border-0 text-end">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    {recentStudents.length > 0 ? (
                      recentStudents.slice(0, 5).map((student) => (
                        <tr key={student.studentID}>
                          <td className="px-4 py-3">
                            <Badge bg="primary" bg="opacity-10" text="primary" className="fw-bold px-2 py-1 rounded-3">
                              #{student.studentID}
                            </Badge>
                          </td>
                          <td className="py-3 fw-semibold text-dark">{student.studentName}</td>
                          <td className="py-3 text-muted">{student.course}</td>
                          <td className="px-4 py-3 text-muted text-end">{student.phone}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-5 text-muted">
                          <div className="d-flex flex-column align-items-center">
                            <FaUserSlash size={40} className="text-muted opacity-25 mb-3" />
                            <span className="fw-medium">No Students Found</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          {/* Recent Fee Records */}
          <Col xs={12} lg={5}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Header className="bg-white border-0 pt-4 pb-3 px-4">
                <h5 className="mb-0 fw-bold text-dark">Recent Fee Records</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="align-middle mb-0">
                  <thead className="bg-light text-muted small text-uppercase">
                    <tr>
                      <th className="px-4 py-3 border-0">Student</th>
                      <th className="py-3 border-0">Paid</th>
                      <th className="px-4 py-3 border-0 text-end">Pending</th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    {recentFees.length > 0 ? (
                      recentFees.slice(0, 5).map((fee) => (
                        <tr key={fee.id}>
                          <td className="px-4 py-3">
                            <div className="fw-semibold text-dark">{fee.studentName}</div>
                            <small className="text-muted">{fee.course}</small>
                          </td>
                          <td className="py-3">
                            <span className="text-success fw-bold">₹{Number(fee.paidFees).toLocaleString()}</span>
                          </td>
                          <td className="px-4 py-3 text-end">
                            <Badge bg={fee.pendingFees > 0 ? "danger" : "success"} className="rounded-pill px-3 py-2 shadow-sm">
                              ₹{Number(fee.pendingFees).toLocaleString()}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-5 text-muted">
                          <div className="d-flex flex-column align-items-center">
                            <FaReceipt size={40} className="text-muted opacity-25 mb-3" />
                            <span className="fw-medium">No Fee Records Found</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )

}

export default Home;