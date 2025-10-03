import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Students() {
  const [student, setStudent] = useState([]);
  const [id, setId] = useState(undefined);
  // serch
  const [filterUser, setFilterUser] = useState([]);

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
  });

  const [alert, setAlert] = useState("");

  function loadStudent() {
    axios.get(import.meta.env.VITE_BASE_URL + "/students").then((res) => {
      console.log(res.data.data);
      setStudent(res.data.data);
      setFilterUser(res.data.data);
    });
  }

  useEffect(() => {
    loadStudent();
  }, []);

  function handleDelete(id) {
    // console.log(id);
    axios
      .delete(import.meta.env.VITE_BASE_URL + "/students/" + id)
      .then((res) => {
        console.log(res.data.data);
        loadStudent();
        setAlert("delete");

        setTimeout(() => {
          setAlert("");
        }, 2000);
      });
  }

  function handleEdite(id) {
    setId(id);
    axios.get(import.meta.env.VITE_BASE_URL + "/students/" + id).then((res) => {
      console.log(res.data.data);
      const { name, email } = res.data.data;

      setStudentData({
        name: name,
        email: email,
      });
    });
  }

  function handleStudentChange(e) {
    setStudentData({ ...studentData, [e.target.id]: e.target.value });
  }

  function handleStudentSubmit(e) {
    e.preventDefault();
    // console.log(studentData);
    axios
      .put(import.meta.env.VITE_BASE_URL + "/students/" + id, studentData)
      .then((res) => {
        console.log(res.data.data);
        loadStudent();

        setAlert("update");

        setTimeout(() => {
          setAlert("");
        }, 2000);

        const modalEl = document.getElementById("studentModal");
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) {
          modalInstance.hide();
        }
        setStudentData({ name: "", email: "" });
      });
  }

  function handleSerch(e) {
    // console.log(e.target.value);
    const serchText = e.target.value;
    if (serchText.toLowerCase() === "") {
      setFilterUser(student);
    } else {
      const foundUser = student.filter((std) => {
        return (
          std.name.includes(serchText) ||
          std.email.toLowerCase().includes(serchText)
        );
      });
      setFilterUser(foundUser);
    }
  }

  return (
    <>
      <center>
        <h1
          className="mt-4"
          style={{
            backgroundColor: "#e0f0ff",
            padding: "1rem 0",
          }}
        >
          STUDENTS
        </h1>
      </center>

      {alert == "update" && (
        <div className="alert alert-success py-2 text-center" role="alert">
          Student updated successfully!
        </div>
      )}
      {alert == "delete" && (
        <div className="alert alert-danger py-2 text-center" role="alert">
          Student delete successfully!
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
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterUser.map((eachdata, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{eachdata.name}</td>
                <td>{eachdata.email}</td>
                <td>
                  <button
                    onClick={() => {
                      handleEdite(eachdata._id);
                    }}
                    className="btn btn-primary  ms-5"
                    data-bs-toggle="modal"
                    data-bs-target="#studentModal"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn btn-danger ms-5"
                    onClick={() => {
                      handleDelete(eachdata._id);
                    }}
                  >
                    <i class="fa-solid fa-user-minus"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
                  value={studentData.name}
                  onChange={handleStudentChange}
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="form-control mb-3"
                />
                <input
                  value={studentData.email}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Students;
