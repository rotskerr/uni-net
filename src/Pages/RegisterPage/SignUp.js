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