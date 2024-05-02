/**
 * Login component.
 *
 * This component is responsible for handling user login. It maintains two pieces of state: `data` (an object containing the user's email and password) and `submit` (a boolean indicating whether the form has been submitted).
 *
 * The `handleChange` function is used to update the `data` state when the user types in the email or password field.
 *
 * The `handleLogin` function is used to handle the form submission. It sends a POST request to the API with the user's email and password. If the response status is 201, it stores the returned token and user ID in local storage and sets the `submit` state to true.
 *
 * The `useEffect` hook is used to navigate to the home page when the `submit` state is true.
 *
 * The component returns a JSX element that includes a form for user login. The form includes fields for the user's email and password, and a button to submit the form.
 *
 * @returns {JSX.Element} The rendered Login component.
 *
 * @example
 * <Login />
 *
 * @property {Object} data - An object containing the user's email and password.
 * @property {Function} setData - Function to set the `data` state.
 * @property {boolean} submit - Boolean indicating whether the form has been submitted.
 * @property {Function} setSubmit - Function to set the `submit` state.
 * @property {Function} handleChange - Function to handle changes in the email and password fields.
 * @property {Function} handleLogin - Function to handle the form submission.
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    const newObj = { ...data, [e.target.name]: e.target.value };
    setData(newObj);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmit(true);
  
    try {
      const response = await axios({
        method: "post",
        url: "https://uni-net.fun/api/v1/consumer/login",
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        console.log("Login successful");
        // Assuming the token is returned in the response data
        const token = response.data.token;
        const userId = response.data.consumer.id; // Get user ID from response
      
        // Store the token and user ID in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId); // Store user ID
      
        console.log('Token stored in local storage:', token);
        console.log('User ID stored in local storage:', userId);
        console.log(response);
        setSubmit(true); // Moved inside the if statement
      } else {
        console.log(`Server responded with status code ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        console.log(`Server responded with status code ${error.response.status}`);
      } else if (error.request) {
        console.log("No response received from server");
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (submit) {
      navigate("/home");
    }
  }, [submit]);

  return (
    <div className="container">
      <div className="container-form">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <p>Please fill the input below here.</p>

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

          <div className="divBtn">
            <button type="submit" className="loginBtn">
              LOGIN
            </button>
          </div>

          <div className="dont">
            <p>
              Don't have an account? <Link to="/signup"><span>Sign up</span></Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;