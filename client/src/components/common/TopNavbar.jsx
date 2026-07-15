import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
// import { Dropdown, Badge } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
// import {  FaBell, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { FaBars } from "react-icons/fa";


function TopNavbar({ showSidebar, setShowSidebar }) {
  const location = useLocation();




  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm py-3 mb-4 sticky-top border-bottom">

        <Container fluid className="px-4">
          {/* Brand / Logo */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold fs-4 text-primary">
            <FaBars
              size={24}
              className="me-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowSidebar(!showSidebar)}
            />
            <FaGraduationCap size={32} className="me-2" />
            <span>Student Management System</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Main Navigation Links */}
            <Nav className="me-auto text-uppercase fw-semibold ms-lg-4" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
              <Nav.Link
                as={Link}
                to="/"
                className={`px-3 py-2 rounded-3 me-2 ${location.pathname === '/' ? 'bg-primary bg-opacity-10 text-primary' : 'text-dark custom-nav-hover'}`}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/Student"
                className={`px-3 py-2 rounded-3 me-2 ${location.pathname.startsWith('/Student') ? 'bg-primary bg-opacity-10 text-primary' : 'text-dark custom-nav-hover'}`}
              >
                Students
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/Teachers"
                className={`px-3 py-2 rounded-3 me-2 ${location.pathname.startsWith('/Teachers') ? 'bg-primary bg-opacity-10 text-primary' : 'text-dark custom-nav-hover'}`}
              >
                Teachers
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/Fees"
                className={`px-3 py-2 rounded-3 me-2 ${location.pathname.startsWith('/Fees') ? 'bg-primary bg-opacity-10 text-primary' : 'text-dark custom-nav-hover'}`}
              >
                Fees
              </Nav.Link>
            </Nav>
            {/* Right side icons / Profile */}
            <Nav className="align-items-center">
              {/* Notifications */}
              {/* <div className="position-relative me-4 cursor-pointer text-muted custom-icon-hover">
                <FaBell size={20} />
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '0.6rem' }}>
                  3
                </Badge>
              </div> */}
              {/* Profile Dropdown */}
              {/* <Dropdown align="end"> */}
              {/* <Dropdown.Toggle variant="light" id="dropdown-profile" className="d-flex align-items-center border-0 bg-transparent shadow-none p-0">
                  <FaUserCircle size={32} className="text-secondary me-2" />
                  <div className="d-none d-md-block text-start">
                    <span className="d-block fw-bold text-dark" style={{ fontSize: '0.9rem', lineHeight: '1' }}>Admin User</span>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>Administrator</span>
                  </div>
                </Dropdown.Toggle> */}
              {/* <Dropdown.Menu className="border-0 shadow-lg rounded-4 mt-3 pb-2 pt-2" style={{ minWidth: '200px' }}>
                  <Dropdown.Header className="fw-bold text-uppercase text-muted" style={{ fontSize: '0.7rem' }}>Account</Dropdown.Header>
                  <Dropdown.Item as={Link} to="/Profile" className="d-flex align-items-center py-2">
                    <FaUserCircle className="me-3 text-muted" /> My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/Settings" className="d-flex align-items-center py-2">
                    <FaCog className="me-3 text-muted" /> Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#logout" className="d-flex align-items-center py-2 text-danger">
                    <FaSignOutAlt className="me-3" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu> */}
              {/* </Dropdown>  */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>



    </>
  );

}

export default TopNavbar;




