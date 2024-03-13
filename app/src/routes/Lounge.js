import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Lounge.css";
const Lounge = () => {
  const { auth } = useAuth();

  return (
    <div className="content" id="content-lounge">
      <h1>Lounge</h1>
      <p>Welcome, {auth.username ? auth.username : "User"}.</p>
      <Link to="/" className="home-btn">
        Go to Home
      </Link>
    </div>
  );
};

export default Lounge;
