import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Home() {
  const [student, setStudent] = useState({ name: "", email: "" });
  const [course, setCourse] = useState({
    title: "",
    description: "",
    duration: "",
    fees: "",
  });
  const [assignCourse, setAssignCourse] = useState({
    studentId: "",
    courseId: "",
  });

  const [stdData, setStdData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [assigncourseData, setAssignCourseData] = useState([]);

  // alert
  const [stdAlert, setstdAlert] = useState(false);
  const [CourseAlert, setcourseAlert] = useState(false);
  const [assignAlert, setAssignAlert] = useState(false);

  //view
  const [viewdata, setviewData] = useState({});

  function fetchStudentCourse(e) {
    const studentId = e.target.value;
    console.log(studentId);
    if (studentId) {
      axios
        .get(import.meta.env.VITE_BASE_URL + "/course_assign/" + studentId)
        .then((res) => {
          console.log(res.data.data);
          setAssignCourseData(res.data.data);
        });
    } else {
      setAssignCourseData([]);
    }
  }

  function loadStaduntData() {
    axios.get(import.meta.env.VITE_BASE_URL + "/students").then((res) => {
      console.log(res.data.data);
      setStdData(res.data.data);
    });
  }

  function loadCourseData() {
    axios.get(import.meta.env.VITE_BASE_URL + "/course").then((res) => {
      // console.log(res.data.data);
      setCourseData(res.data.data);
    });
  }

  useEffect(() => {
    loadStaduntData();
    loadCourseData();
  }, []);

  function handleStudentChange(e) {
    setStudent({ ...student, [e.target.id]: e.target.value });
  }

  function handleCourseChange(e) {
    setCourse({ ...course, [e.target.id]: e.target.value });
  }

  function handleAssginCourseChange(e) {
    // console.log(e.target.value);
    setAssignCourse({ ...assignCourse, [e.target.id]: e.target.value });
  }

  function handleStudentSubmit(e) {
    e.preventDefault();
    console.log(student);

    axios
      .post(import.meta.env.VITE_BASE_URL + "/students", student)
      .then((res) => {
        console.log(res.data);
        loadStaduntData();
      });

    setstdAlert(true);
    setTimeout(() => {
      setstdAlert(false);
    }, 2000);

    setStudent({ name: "", email: "" });
  }

  function handleCourseSubmit(e) {
    e.preventDefault();
    console.log(course);

    axios
      .post(import.meta.env.VITE_BASE_URL + "/course", course)
      .then((res) => {
        console.log(res.data);
        loadCourseData();
      });

    setcourseAlert(true);
    setTimeout(() => {
      setcourseAlert(false);
    }, 2000);

    setCourse({
      title: "",
      description: "",
      duration: "",
      fees: "",
    });
  }

  function handleAssginCourseSubmit(e) {
    e.preventDefault();
    console.log(assignCourse);

    axios
      .post(import.meta.env.VITE_BASE_URL + "/course_assign", assignCourse)
      .then((res) => {
        console.log(res.data);

        setAssignAlert(true);
        setTimeout(() => {
          setAssignAlert(false);
        }, 2000);

        setAssignCourse({
          studentId: "",
          courseId: "",
        });
      });
  }

  function handleViewClick(id) {
    axios.get(import.meta.env.VITE_BASE_URL + "/course/" + id).then((res) => {
      // console.log(res.data.data);
      setviewData(res.data.data);
      // console.log(viewdata);
    });
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row min-vh-100">
          {/* Sidebar Section */}
          <div className="col-lg-3 bg-light p-4">
            <select className="form-select mb-3" onChange={fetchStudentCourse}>
              <option value="">Select Student</option>
              {stdData.map((std, i) => (
                <option key={i} value={std._id}>
                  {std.name}
                </option>
              ))}
            </select>

            <div className="d-grid gap-2">
              <button
                className="btn btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target="#studentModal"
              >
                Add Student
              </button>

              <button
                className="btn btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target="#courseModal"
              >
                Add Course
              </button>
              <button
                className="btn btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target="#assign-courseModal"
              >
                Assign Course
              </button>
              {/* Add the two buttons here */}
              <div className="text-center" style={{ marginTop: "20rem" }}>
                <Link to={"/students"}>
                  <button className="btn btn-warning me-4">
                    Students <br />
                    <i class="fa-solid fa-graduation-cap"></i>
                  </button>
                </Link>
                <Link to={"/course"}>
                  <button className="btn btn-info">
                    Courses <br />
                    <i class="fa-solid fa-language"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* <----CARD SECTION-----> */}
          <div className="col-lg-9 mt-3">
            <div className="d-flex gap-4 flex-wrap">
              {/* {assigncourseData.map((eachData, i) => (
                <div
                  key={i}
                  className="card bg-light border-start border-4 border-info p-3 mb-3"
                  style={{ width: "100%" }}
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="fw-bold mb-1">
                        {eachData.courseId.title}
                      </h5>
                      <p className="mb-0 small text-muted">
                        {eachData.courseId.description}
                      </p>
                    </div>
                    <span
                      onClick={() => {
                        handleViewClick(eachData.courseId._id);
                      }}
                      className="badge bg-info"
                      data-bs-toggle="modal"
                      data-bs-target="#courseDetailModalLabel"
                    >
                      View
                    </span>
                  </div>
                </div>
              ))} */}
              {assigncourseData.length > 0 ? (
                assigncourseData.map((eachData, i) => (
                  <div
                    key={i}
                    className="card bg-light border-start border-4 border-info p-3 mb-3"
                    style={{ width: "100%" }}
                  >
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5 className="fw-bold mb-1">
                          {eachData.courseId.title}
                        </h5>
                        <p className="mb-0 small text-muted">
                          {eachData.courseId.description}
                        </p>
                      </div>
                      <span
                        onClick={() => {
                          handleViewClick(eachData.courseId._id);
                        }}
                        className="badge bg-info"
                        data-bs-toggle="modal"
                        data-bs-target="#courseDetailModalLabel"
                        style={{ cursor: "pointer" }}
                      >
                        View
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center w-100 mt-5">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="No Data"
                    width="300"
                    className="mb-3"
                  />
                  <h2 className="text-muted">
                    Please select a student to view assigned courses.
                  </h2>
                </div>
              )}

              {/* <div
                className="card bg-light border-start border-4 border-info p-3 mb-3"
                style={{ width: "100%" }}
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="fw-bold mb-1">New Course Assigned</h6>
                    <p className="mb-0 small text-muted">
                      You’ve been assigned to "MongoDB Essentials".
                    </p>
                  </div>
                  <span className="badge bg-info">New</span>
                </div>
              </div> */}
            </div>
          </div>

          {/* <-- Modal ---> */}
          <div>
            {/* Add Student Modal */}

            <div
              className="modal fade"
              id="studentModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      ADD STUDENT
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <input
                      value={student.name}
                      onChange={handleStudentChange}
                      id="name"
                      type="text"
                      placeholder="Name"
                      className="form-control mb-3"
                    />
                    <input
                      value={student.email}
                      onChange={handleStudentChange}
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="form-control mb-3"
                    />
                  </div>
                  <div className="modal-footer gap-4">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleStudentSubmit}
                    >
                      Save changes
                    </button>
                  </div>
                  <div>
                    {stdAlert && (
                      <div
                        className="alert alert-success py-2 text-center"
                        role="alert"
                      >
                        Student added successfully!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Add Course Modal */}
            <div
              className="modal fade"
              id="courseModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      ADD COURSE
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <input
                      value={course.title}
                      onChange={handleCourseChange}
                      id="title"
                      type="text"
                      placeholder="Title"
                      className="form-control mb-3"
                    />
                    <input
                      value={course.description}
                      onChange={handleCourseChange}
                      id="description"
                      type="text"
                      placeholder="Description"
                      className="form-control mb-3"
                    />
                    <input
                      value={course.duration}
                      onChange={handleCourseChange}
                      id="duration"
                      type="text"
                      placeholder="Duration"
                      className="form-control mb-3"
                    />
                    <input
                      value={course.fees}
                      onChange={handleCourseChange}
                      id="fees"
                      type="text"
                      placeholder="Fees (INR)"
                      className="form-control mb-3"
                    />
                  </div>
                  <div className="modal-footer gap-4">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleCourseSubmit}
                    >
                      Save changes
                    </button>
                  </div>
                  <div>
                    {CourseAlert && (
                      <div
                        className="alert alert-success py-2 text-center"
                        role="alert"
                      >
                        Course added successfully!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Assign Course */}
            <div
              className="modal fade"
              id="assign-courseModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Assign Course to Student
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body ">
                    <select
                      value={assignCourse.studentId}
                      id="studentId"
                      onChange={handleAssginCourseChange}
                      className="form-select mb-3"
                      aria-label="Default select example"
                    >
                      <option>Select Student</option>
                      {stdData.map((std, i) => (
                        <option key={i} value={std._id}>
                          {std.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={assignCourse.courseId}
                      id="courseId"
                      onChange={handleAssginCourseChange}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option>Select Course</option>

                      {courseData.map((data, i) => (
                        <option key={i} value={data._id}>
                          {data.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAssginCourseSubmit}
                    >
                      Save changes
                    </button>
                  </div>
                  <div>
                    {assignAlert && (
                      <div
                        className="alert alert-success py-2 text-center"
                        role="alert"
                      >
                        Course assgin successfully!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Course-Detail Modal */}
            <div
              className="modal fade"
              id="courseDetailModalLabel"
              tabIndex="-1"
              aria-labelledby="courseDetailModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Course Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      <strong>Course Name:</strong> {viewdata.title}
                    </p>
                    <p>
                      <strong>Course Description:</strong>{" "}
                      {viewdata.description}
                    </p>
                    <p>
                      <strong>Duration:</strong> {viewdata.duration} Months
                    </p>
                    <p>
                      <strong>Fees:</strong> ₹{viewdata.fees}
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
