import React, { useEffect, useState } from "react";
import "../LeftSide/Left.css";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { FiTrendingUp } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { BsBookmark } from "react-icons/bs";
import { RiFileListLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Profile from "../../assets/profile.jpg";
import { getMyProfileInfo } from "../../utils/api";

const Left = ({ profileImg, modelDetails }) => {
  const navigate = useNavigate();
  const [btnActive, setBtnActive] = useState("#");
  const [logOutExit, setLogOutExit] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      const info = await getMyProfileInfo();
      setProfileInfo(info);
    };

    fetchProfileInfo();
  }, []);
  const logout = async () => {
    try {
      const response = await fetch(
        "https://uni-net.fun/api/v1/consumer/logout",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("token");
      console.log("User token was removed");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(
        "https://uni-net.fun/api/v1/consumer/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Account deletion failed");
      }

      localStorage.removeItem("token");
      console.log("User account was deleted and token was removed");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <div className="L-features">
      <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
        <div
          onClick={() => setBtnActive("#")}
          id="L-box"
          className={btnActive === "#" ? "active" : ""}
        >
          <AiOutlineHome className="margin" />
          <span>Home</span>
        </div>
      </Link>

      <Link
        to="/explore"
        style={{ textDecoration: "none", color: "black" }}
        onClick={() => setBtnActive("#explore")}
      >
        <div id="L-box" className={btnActive === "#explore" ? "active" : ""}>
          <AiOutlineSearch className="margin" />
          <span>Explore</span>
        </div>
      </Link>

      <div
        id="L-box"
        onClick={() => setBtnActive("#trending")}
        className={btnActive === "#trending" ? "active" : ""}
      >
        <h1 className="notifi">
          <FiTrendingUp className="margin" />
        </h1>
        <span>Trending</span>
      </div>

      <div
        id="L-box"
        onClick={() => setBtnActive("#lists")}
        className={btnActive === "#lists" ? "active" : ""}
      >
        <RiFileListLine className="margin" />
        <span>Lists</span>
      </div>

      <div
        id="L-box"
        onClick={() => setBtnActive("#saved")}
        className={btnActive === "#saved" ? "active" : ""}
      >
        <BsBookmark className="margin" />
        <span>Saved</span>
      </div>

      <div
        id="L-box"
        onClick={() => setBtnActive("#settings")}
        className={btnActive === "#settings" ? "active" : ""}
      >
        <FiSettings className="margin" />
        <span>Settings</span>
      </div>

      <div className="left-user">
        <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
          <div className="user-name-userid">
            <img src={profileImg ? profileImg : Profile} alt="" />
            <div className="L-user">
              <h1>{profileInfo ? profileInfo.name : "Vijay"}</h1>{" "}
              {/* Replace with the actual property names */}
              <span>{profileInfo ? profileInfo.username : "@vijay98"}</span>
            </div>
          </div>
        </Link>
        <MoreHorizIcon
          onClick={() => setLogOutExit(!logOutExit)}
          className="vert"
        />

        {logOutExit && (
          <div className="logOutExitContainer">
            <button onClick={deleteAccount}>Delete account</button>
            <Link to="/" style={{ width: "100%" }} onClick={logout}>
              <button>Log out @vijay98</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Left;
