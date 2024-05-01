import React, { useState, useEffect, useContext } from "react";
import "../Navigation/Nav.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import Profile from "../../assets/profile.jpg";
import { ThemeContext } from "../../utils/ThemeProvider"; // Update this path to the correct one
import Switch from "@mui/material/Switch";
import { useDebounce } from 'use-debounce';

const Nav = ({ setShowMenu, profileImg }) => {
  const { theme, switchTheme } = useContext(ThemeContext);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      fetch(`https://uni-net.fun/api/v1/consumer/search?query=${debouncedSearch}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // handle the search results here
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, [debouncedSearch]);

  return (
    <nav>
      <div className="n-logo">
        <Link
          to="/home"
          className="logo"
          style={{ color: "black", textDecoration: "none" }}
        >
          <h1>
            Face <span>Gram</span>
          </h1>
        </Link>
      </div>

     

      <div className="social-icons">
        <Link
          to="/home"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <AiOutlineHome className="nav-icons" />
        </Link>

        <Link to="/notification" id="notifi" style={{ marginTop: "8px" }}>
          <IoNotificationsOutline className="nav-icons" />
          <span>5</span>
        </Link>

        <TbMessage className="nav-icons" />
       
      </div>

      <div className="n-profile">
        
        <Link to="/profile">
          <img
            src={profileImg ? profileImg : Profile}
            className="n-img"
            style={{ marginBottom: "-7px" }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;