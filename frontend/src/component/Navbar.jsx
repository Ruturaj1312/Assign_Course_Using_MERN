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
      className="navbar navbar-expand-lg shadow px-3"
      style={{
        backgroundColor: "#e0f0ff",
        padding: "1rem 0",
      }}
    >
      <div>
        Welcome <span>{data.name}</span>
      </div>
      <div className="container-fluid justify-content-center">
        <Link className="navbar-brand  fw-bold fs-4" to="/">
          LEARNING ASSIGN HUB
        </Link>
      </div>
      <button className="btn btn-danger me-3" onClick={handleLogout}>
        Log out
      </button>
    </nav>
  );
}

export default Navbar;
