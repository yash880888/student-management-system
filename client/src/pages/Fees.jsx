import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, InputGroup, Badge, Accordion, ProgressBar } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaExclamationCircle, FaReceipt, FaCheckCircle, FaClock } from 'react-icons/fa';
import axios from "axios";
import LoadingSpinner from "../components/common/LoadingSpinner";


function Fees() {

  const [search, setSearch] = useState("");
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const find = fees.filter((item) => {
    return (
      item.studentName.toLowerCase().includes(search.toLowerCase().trim()) ||
      item.id.toString().includes(search.trim()) ||
      item.course.toLowerCase().includes(search.toLowerCase().trim())
    );
  });

  const navigate = useNavigate();

  function add() {
    navigate("/Fees/Add");
  }

  async function getFees() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/fees");
      setFees(response.data.fees);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFees();
  }, []);

  function goEdit(id) {
    navigate(`/Fees/Edit/${id}`);
  }

  async function deleteFee(id) {
    try {
      await axios.delete(`http://localhost:3000/fees/${id}`);
      await getFees();
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

        {/* HEADER SECTION */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
          <div>
            <h3 className="fw-bold text-dark mb-1 d-flex align-items-center">
              <FaReceipt className="me-2 text-primary" /> Fees Directory
            </h3>
            <p className="text-muted mb-0 small">Manage and track student fee payments</p>
          </div>
          <Button variant="primary" className="d-flex align-items-center px-4 py-2 rounded-pill shadow-sm fw-semibold" onClick={add}>
            <FaPlus className="me-2" /> Add Fee Record
          </Button>
        </div>
        {/* SEARCH SECTION */}
        <Row className="mb-4">
          <Col xs={12} md={8} lg={6}>
            <InputGroup className="shadow-sm rounded-pill overflow-hidden">
              <InputGroup.Text className="bg-white border-end-0 text-muted ps-4">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by student, ID, or course..."
                value={search}
                onChange={handleSearch}
                className="border-start-0 shadow-none py-3"
              />
            </InputGroup>
          </Col>
        </Row>
        {/* UNIQUE ACCORDION SECTION */}
        {find.length === 0 ? (
          <div className="text-center py-5 text-muted bg-white rounded-4 shadow-sm border-0 mt-4 p-5">
            <FaExclamationCircle size={50} className="text-muted opacity-25 mb-3" />
            <h4 className="fw-bold text-dark">No fee records found</h4>
            <p className="mb-0">Create a new fee record to get started.</p>
          </div>
        ) : (
          <Accordion className="mt-4 shadow-sm rounded-4 overflow-hidden" defaultActiveKey="0">
            {find.map((item, index) => {
              const isPaid = Number(item.pendingFees) === 0;
              const progress = (Number(item.paidFees) / Number(item.totalFees)) * 100;
              return (
                <Accordion.Item eventKey={index.toString()} key={item.id} className="border-bottom border-0">
                  <Accordion.Header className="bg-white">
                    <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                      <div className="d-flex align-items-center gap-3">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary p-2 rounded-3 fw-bold">#{item.id}</span>
                        <span className="fw-bold text-dark fs-5">{item.studentName}</span>
                      </div>
                      <div>
                        <Badge
                          bg={isPaid ? "success" : "warning"}
                          text={isPaid ? "white" : "dark"}
                          className="px-3 py-2 rounded-pill"
                        >
                          {isPaid ? <><FaCheckCircle className="me-1" /> Paid</> : <><FaClock className="me-1" /> Pending: ₹{item.pendingFees}</>}
                        </Badge>
                      </div>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body className="bg-light p-4">
                    <Row className="align-items-center">

                      {/* INFO COLUMN */}
                      <Col md={3} className="mb-3 mb-md-0">
                        <div className="mb-2">
                          <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "0.7rem" }}>Course</small>
                          <h6 className="fw-bold mb-0 text-primary">{item.course}</h6>
                        </div>
                      </Col>
                      {/* PROGRESS BAR COLUMN */}
                      <Col md={5} className="mb-4 mb-md-0">
                        <div className="d-flex justify-content-between small fw-bold mb-2">
                          <span className="text-muted">Payment Progress</span>
                          <span className={isPaid ? "text-success" : "text-warning"}>{Math.round(progress || 0)}%</span>
                        </div>
                        <ProgressBar
                          now={progress || 0}
                          variant={isPaid ? "success" : "warning"}
                          className="rounded-pill shadow-sm"
                          style={{ height: '10px' }}
                        />
                      </Col>
                      {/* STATS COLUMN */}
                      <Col md={4}>
                        <div className="d-flex justify-content-around bg-white p-3 rounded-4 shadow-sm border">
                          <div className="text-center">
                            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "0.65rem" }}>Total</small>
                            <div className="fw-bold">₹{Number(item.totalFees).toLocaleString()}</div>
                          </div>
                          <div className="border-end"></div>
                          <div className="text-center">
                            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "0.65rem" }}>Paid</small>
                            <div className="fw-bold text-success">₹{Number(item.paidFees).toLocaleString()}</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                      <Button variant="outline-primary" size="sm" className="px-3 rounded-pill fw-semibold border-2" onClick={() => goEdit(item.id)}>
                        <FaEdit className="me-1" /> Edit Record
                      </Button>
                      <Button variant="outline-danger" size="sm" className="px-3 rounded-pill fw-semibold border-2" onClick={() => deleteFee(item.id)}>
                        <FaTrash className="me-1" /> Delete
                      </Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        )}
      </Container>
    </>
  );
}

export default Fees;