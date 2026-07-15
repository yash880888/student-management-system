import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaWallet,
  // FaClipboardList,
  // FaBook,
  // FaChartBar,
  // FaCog,
  FaTimes,
} from "react-icons/fa";

function Sidebar({ showSidebar, setShowSidebar }) {
  const location = useLocation();

  const menuItems = [
    { path: "/", name: "Dashboard", icon: <FaHome /> },
    { path: "/Student", name: "Students", icon: <FaUserGraduate /> },
    { path: "/Teachers", name: "Teachers", icon: <FaChalkboardTeacher /> },
    { path: "/Fees", name: "Fees", icon: <FaWallet /> },
    // { path: "/Attendance", name: "Attendance", icon: <FaClipboardList /> },
    // { path: "/Courses", name: "Courses", icon: <   FaBook /> },
    // { path: "/Reports", name: "Reports", icon: <FaChartBar /> },
    // { path: "/Settings", name: "Settings", icon: <FaCog /> },
  ];

  return (
    <div
      className="bg-white border-end position-fixed top-0 start-0 vh-100 shadow"
      style={{
        width: "260px",
        zIndex: 1050,
        transform: showSidebar ? "translateX(0)" : "translateX(-260px)",
        transition: "transform 0.3s ease",
      }}
    >
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="text-primary m-0">Student MS</h5>

        <button
          className="btn btn-sm btn-light"
          onClick={() => setShowSidebar(false)}
        >
          <FaTimes />
        </button>
      </div>

      <Nav className="flex-column p-3">
        {menuItems.map((item) => {
          const active =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <Nav.Link
              key={item.name}
              as={Link}
              to={item.path}
              onClick={() => setShowSidebar(false)}
              className={`mb-2 rounded-3 py-3 px-3 ${
                active ? "bg-primary text-white" : "text-dark"
              }`}
            >
              <span className="me-3">{item.icon}</span>
              {item.name}
            </Nav.Link>
          );
        })}
      </Nav>
    </div>
  );
}

export default Sidebar;