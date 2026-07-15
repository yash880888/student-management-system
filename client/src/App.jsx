// import React from "react";
// import Navbar from "./Navbar.jsx"
import Student from "./pages/Student.jsx"
import Fees from "./pages/Fees.jsx"
import Home from "./pages/Home.jsx"
import Teachers from "./pages/Teachers.jsx"
import AddFee from "./pages/AddFee.jsx"
import AddStudent from "./pages/AddStudent.jsx"
import AddTeacher from "./pages/AddTeacher.jsx"
import TopNavbar from "./components/common/TopNavbar.jsx";
import Sidebar from "./components/common/Sidebar.jsx";
import { useState } from "react";

// import "./Router.css"
import { Routes, Route } from "react-router-dom"




function Router() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <div className="d-flex">
        <Sidebar

          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        {showSidebar && (
          <div 
            onClick={() => setShowSidebar(false)}
            style={{
              
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 1040,
            }}
          />
        )}  

        <div className="flex-grow-1" style={{ overflowY: 'auto', height: '100vh' }}>
          <TopNavbar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
          <div className="p-4">
            <Routes>

              <Route path="/" element={<Home />}></Route>
              <Route path="/Student/Edit/:id" element={<AddStudent />} />
              <Route path="/Student" element={<Student />}></Route>
              <Route path="/Student/AddStudent" element={<AddStudent />} ></Route>
              <Route path="/Fees" element={<Fees />} ></Route>
              <Route path="/Fees/Edit/:id" element={<AddFee />} />
              <Route path="/Fees/Add" element={<AddFee />} />
              <Route path="/Teachers" element={<Teachers />}></Route>
              <Route path="/Teachers/Edit/:id" element={<AddTeacher />} />
              <Route path="/Teachers/AddTeacher" element={<AddTeacher />}></Route>
            </Routes >
          </div>
        </div>
      </div>
    </>
  )
}

export default Router;




























