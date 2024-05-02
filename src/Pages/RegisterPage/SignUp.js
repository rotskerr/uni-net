/**
 * SignUp component.
 *
 * This component is responsible for handling user registration. It maintains three pieces of state: `data` (an object containing the user's nickname, email, password, and password confirmation), `submit` (a boolean indicating whether the form has been submitted), and `error` (an object containing any error messages).
 *
 * The `handleChange` function is used to update the `data` state when the user types in any of the input fields.
 *
 * The `handleSignUp` function is used to handle the form submission. It sends a POST request to the API with the user's nickname, email, password, and password confirmation. If the response status is 201, it stores the returned token in local storage and navigates to the customization page. If there is an error, it updates the `error` state with the error message.
 *
 * The `useEffect` hook is used to navigate to the home page when the form has been submitted and there are no errors.
 *
 * The component returns a JSX element that includes a form for user registration. The form includes fields for the user's nickname, email, password, and password confirmation, and a button to submit the form.
 *
 * @returns {JSX.Element} The rendered SignUp component.
 *
 * @example
 * <SignUp />
 *
 * @property {Object} data - An object containing the user's nickname, email, password, and password confirmation.
 * @property {Function} setData - Function to set the `data` state.
 * @property {boolean} submit - Boolean indicating whether the form has been submitted.
 * @property {Function} setSubmit - Function to set the `submit` state.
 * @property {Object} error - An object containing any error messages.
 * @property {Function} setError - Function to set the `error` state.
 * @property {Function} handleChange - Function to handle changes in the input fields.
 * @property {Function} handleSignUp - Function to handle the form submission.
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import './RegisterPage.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);

  const [data, setData] = useState({
    nickname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    const newObj = { ...data, [e.target.name]: e.target.value };
    setData(newObj);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSubmit(true);
  
    try {
      const response = await axios({
        method: "post",
        url: "https://uni-net.fun/api/v1/consumer/register",
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        // Assuming the token is returned in the response data
        const token = response.data.token;
        // Store the token in local storage
        localStorage.setItem('token', token);
        navigate("/customization");
      } else {
        setError({
          server: `Server responded with status code ${response.status}`,
        });
      }
    } catch (error) {
      if (error.response) {
        setError({
          server: `Server responded with status code ${error.response.status}`,
        });
      } else if (error.request) {
        setError({ server: "No response received from server" });
      } else {
        setError({ server: `Error: ${error.message}` });
      }
    }
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      navigate("/home");
    }
  }, [error]);

  return (
    <div className="container">
      <div className="container-form">
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <p>Please fill the input below here.</p>

          <div className="inputBox">
            <AiOutlineUser className="fullName" />
            <input
              type="text"
              name="nickname"
              id="nickname"
              onChange={handleChange}
              placeholder="nickname"
            />
          </div>

          <div className="inputBox">
            <FiMail className="mail" />
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div className="inputBox">
            <RiLockPasswordLine className="password" />
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          <div className="inputBox">
            <RiLockPasswordLine className="password" />
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>

          <div className="divBtn">
            <button className="loginBtn" onClick={handleSignUp}>
              SIGN UP
            </button>
          </div>
        </form>

        <div className="dont">
          <p>
            Already have a account?{" "}
            <Link to="/">
              <span>Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;