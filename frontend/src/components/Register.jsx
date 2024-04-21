import styles from "./Auth.module.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [usernameError, setNameError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "email") {
      setEmailError("");
    }
    if (name === "username") {
      setNameError("");
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const { email, username, password } = formData;
    const userData = { email, username, password }; // Add role field
    const res = await axios.post(
      "http://localhost:8000/user/register",
      userData
    );
    try {
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message, { className: "toast-success" }); // Add className for green color
        form.reset();
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Check Email and Name its already exist");
      }
    }
    if (res.data.message === "Email is already registered") {
      toast.error("Email is already registered. Please use another email.");
    }
    if (res.data.message === "Name is already registered") {
      toast.error("Name is already registered. Please use another name.");
    }
  };
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="grow"
            placeholder="Username"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="grow"
          />
        </label>
        <button className="btn glass" type="submit">
          Submit
        </button>
        {/* <Link
          to="/login"
          className="text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded"
        >
          Already Have an Account
        </Link> */}
      </form>
    </>
  );
}

export default Register;
