import React, { useState } from "react";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import FriendsId from "./Pages/FriendsId/FriendsId";
import { Route, Routes } from "react-router-dom";
import Notification from "./Pages/Notification/Notification";
import Login from "./Pages/RegisterPage/Login";
import SignUp from "./Pages/RegisterPage/SignUp";
import ProtectedRoute from "../src/Components/Navigation/ProtectedRoute";
import UserCustomization from "./Pages/Profile/UserCustomization"; // Make sure this path is correct
import Explore from "./Pages/Explore/Explore";

const App = () => {
  const [friendProfile, setFriendsProfile] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={<Home setFriendsProfile={setFriendsProfile} />}
            />
          }
        />

        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />

        <Route
          path="/friendsId"
          element={
            <ProtectedRoute
              element={<FriendsId friendProfile={friendProfile} />}
            />
          }
        />

        <Route
          path="/notification"
          element={<ProtectedRoute element={<Notification />} />}
        />

        <Route
          path="/customization"
          element={<ProtectedRoute element={<UserCustomization />} />}
        />

        <Route
          path="/explore"
          element={<ProtectedRoute element={<Explore />} />}
        />

        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
