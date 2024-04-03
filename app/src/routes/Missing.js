import React from "react";
import { Link } from "react-router-dom";
import "./Missing.css";
const Missing = () => {
  return (
    <div className="content" id="content-missing">
      <h2>404</h2>
      <Link to="/" className="home-btn">
        Go to Home
      </Link>
    </div>
  );
};

export default Missing;
