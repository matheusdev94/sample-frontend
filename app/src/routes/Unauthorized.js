import React from "react";
import { Link } from "react-router-dom";
import "./Unauthorized.css";
const Unauthorized = () => {
  return (
    <div className="content" id="content-unauthorized">
      <h2>Unauthorized</h2>
      <Link to="/" className="home-btn">
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
