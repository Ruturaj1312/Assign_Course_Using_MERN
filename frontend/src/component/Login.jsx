import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoding] = useState(false);
  const nav = useNavigate();

  function handleSubmit(e) {
    setLoding(true);
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    axios
      .post("http://localhost:8080/user/login", payload)
      .then((res) => {
        console.log("Login successfully...", res);
        toast("Login successfully...");
        setLoding(true);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setTimeout(() => {
          nav("/");
        }, 3000);
      })
      .catch((err) => {
        console.log("Login faild...", err);
        toast("Login faild...");
        setLoding(false);
      });

    console.log(payload);
  }
  return (
    <div>
      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <ToastContainer />
        <div class="container">
          <div class="row justify-content-center">
            <div class="d-flex justify-content-center py-4">
              <img src="assets/img/logo.png" alt="" />
              <h3 className="text-primary">LEARNING ASSIGN HUB</h3>
            </div>
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                    <p class="text-center small">
                      Enter your username & password to login
                    </p>
                  </div>

                  <form class="row g-3 needs-validation" novalidate>
                    <div class="col-12">
                      <label for="yourUsername" class="form-label">
                        Username
                      </label>
                      <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">
                          @
                        </span>
                        <input
                          type="emial"
                          name="email"
                          class="form-control"
                          id="emial"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div class="invalid-feedback">
                          Please enter your username.
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        class="form-control"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div class="invalid-feedback">
                        Please enter your password!
                      </div>
                    </div>

                    <div class="col-12 mt-5">
                      <button
                        disabled={loading}
                        class="btn btn-primary w-100"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        {loading ? "Submitting..." : "Login"}
                      </button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">
                        Don't have account?{" "}
                        <Link to={"/register"} href="pages-register.html">
                          Create an account
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
