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