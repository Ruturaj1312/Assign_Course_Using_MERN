import { useState } from "react";
import Home from "./component/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Students from "./component/Students";
import Courses from "./component/Courses";
import Registration from "./component/Registration";
import Login from "./component/Login";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          {/* <Navbar /> */}
          <Route element={<ProtectedRoute /> }>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/course" element={<Courses />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
