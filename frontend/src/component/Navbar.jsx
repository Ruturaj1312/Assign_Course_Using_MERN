import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  let token = JSON.parse(localStorage.getItem("token"));
  function fetchData() {
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post("http://localhost:8080/user/profile", {}, header)
      .then((res) => {
        console.log("Data fetched...", res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  function handleLogout() {
    const result = confirm("Are your sure you want log out ?");
    if (result) {
      localStorage.removeItem("token");
      nav("/login");
    }
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow"
      style={{ backgroundColor: "#e0f0ff", padding: "1rem" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Learning Assign Hub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarContent"
        >
          <div className="d-lg-block d-none">
            <span className="fw-semibold text-secondary">
              Welcome, <span className="text-primary">{data.name}</span>
            </span>
          </div>
          <div className="ms-auto">
            <button className="btn btn-danger" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
