import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Registration() {
  const nav = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loding, setLoding] = useState(false);

  function handleSubmit(e) {
    setLoding(true);
    e.preventDefault();
    const payload = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8080/user/register", payload)
      .then((res) => {
        console.log("User register sccessfully..", res);
        toast("Register successfully...");
        setLoding(true);
        setTimeout(() => {
          nav("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log("Error while registration...", err);
        toast("Registration Faild...");
        setLoding(false);
      });

    console.log(payload);
  }

  return (
    <div>
      <div class="container">
        <ToastContainer />
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div class="d-flex justify-content-center py-4">
                  <img src="assets/img/logo.png" alt="" />
                  <h3 className="text-primary">LEARNING ASSIGN HUB</h3>
                </div>

                <div class="card mb-3">
                  <div class="card-body">
                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">
                        Create an Account
                      </h5>
                      <p class="text-center small">
                        Enter your personal details to create account
                      </p>
                    </div>

                    <form class="row g-3 needs-validation" novalidate>
                      <div class="col-12">
                        <label for="yourName" class="form-label">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          class="form-control"
                          id="name"
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                        <div class="invalid-feedback">
                          Please, enter your name!
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="yourUsername" class="form-label">
                          Username
                        </label>
                        <div class="input-group has-validation">
                          <span class="input-group-text" id="inputGroupPrepend">
                            @
                          </span>
                          <input
                            type="text"
                            name="email"
                            class="form-control"
                            id="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <div class="invalid-feedback">
                            Please choose a username.
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
                          disabled={loding}
                          class="btn btn-primary w-100"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          {loding ? "Creating Account" : "Create Account"}
                        </button>
                      </div>
                      <div class="col-12">
                        <p class="small mb-0">
                          Already have an account?{" "}
                          <Link to={"/login"} href="pages-login.html">
                            Log in
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
    </div>
  );
}

export default Registration;
