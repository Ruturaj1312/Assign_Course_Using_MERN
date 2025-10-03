import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Courses() {
  const [course, setCourse] = useState([]);
  const [id, setId] = useState(undefined);

  const [filterCourse, setFilterCourse] = useState([]);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    duration: "",
    fees: "",
  });

  // const [alert, setAlert] = useState(false);
  const [alert, setAlert] = useState("");

  function featchCourse() {
    axios.get(import.meta.env.VITE_BASE_URL + "/course").then((res) => {
      console.log(res.data.data);
      setCourse(res.data.data);
      setFilterCourse(res.data.data);
    });
  }
  // console.log(course);

  useEffect(() => {
    featchCourse();
  }, []);

  function handleCourseDelete(id) {
    axios
      .delete(import.meta.env.VITE_BASE_URL + "/course/" + id)
      .then((res) => {
        // console.log(res.data.data);
        featchCourse();

        setAlert("deleted");

        setTimeout(() => {
          setAlert("");
        }, 2000);
      });
  }

  function handleCourseEdite(id) {
    setId(id);
    axios.get(import.meta.env.VITE_BASE_URL + "/course/" + id).then((res) => {
      console.log(res.data.data);
      const { title, description, duration, fees } = res.data.data;
      setCourseData({
        title: title,
        description: description,
        duration: duration,
        fees: fees,
      });
    });
  }

  function handleCourseChange(e) {
    setCourseData({ ...courseData, [e.target.id]: e.target.value });
    console.log(courseData);
  }

  function handleCourseSubmit(e) {
    e.preventDefault();
    // console.log(courseData);
    axios
      .put(import.meta.env.VITE_BASE_URL + "/course/" + id, courseData)
      .then((res) => {
        console.log(res.data.data);
        featchCourse();

        setAlert("updated");

        setTimeout(() => {
          setAlert("");
        }, 2000);

        const modalEl = document.getElementById("courseModal");
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) {
          modalInstance.hide();
        }
        setCourseData({ title: "", description: "", duration: "", fees: "" });
      });
  }

  function handleSerch(e) {
    const serchCourse = e.target.value;

    if (serchCourse.toLowerCase() === "") {
      setFilterCourse(course);
    } else {
      const foundCours = course.filter((course) => {
        return (
          course.title.includes(serchCourse) ||
          course.description.includes(serchCourse)
        );
      });
      setFilterCourse(foundCours);
    }
  }

  return (
    <>
      <center>
        <h1
          className="mt-4 shadow"
          style={{
            backgroundColor: "#e0f0ff",
            padding: "1rem 0",
          }}
        >
          OUR COURSES
        </h1>
      </center>

      {alert == "updated" && (
        <div className="alert alert-success py-2 text-center" role="alert">
          Course updated successfully!
        </div>
      )}
      {alert == "deleted" && (
        <div className="alert alert-danger py-2 text-center" role="alert">
          Course Deleted successfully!
        </div>
      )}
      <div className="container mt-5">
        <div className="d-flex">
          <Link to={"/"}>
            <button className="btn btn-primary me-3">
              <i className="fa-solid fa-house"></i>
            </button>
          </Link>
          <input
            onChange={handleSerch}
            type="text"
            className="form-control"
            placeholder="Search User"
          />
        </div>

        <table className="table table-success table-striped table-bordered mt-3 text-center">
          <thead>
            <tr>
              <th scope="col">Sr no.</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Fees</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterCourse.map((eachdata, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{eachdata.title}</td>
                <td>{eachdata.description}</td>
                <td>{eachdata.duration}</td>
                <td>{eachdata.fees}</td>
                <td>
                  <button
                    className="btn btn-primary me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#courseModal"
                    onClick={() => handleCourseEdite(eachdata._id)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCourseDelete(eachdata._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
                  value={courseData.title}
                  onChange={handleCourseChange}
                  id="title"
                  type="text"
                  placeholder="Title"
                  className="form-control mb-3"
                />
                <input
                  value={courseData.description}
                  onChange={handleCourseChange}
                  id="description"
                  type="text"
                  placeholder="Description"
                  className="form-control mb-3"
                />
                <input
                  value={courseData.duration}
                  onChange={handleCourseChange}
                  id="duration"
                  type="text"
                  placeholder="Duration"
                  className="form-control mb-3"
                />
                <input
                  value={courseData.fees}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Courses;
