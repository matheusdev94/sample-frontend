import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className="content">
      <h2>Missing</h2>
      <Link to="/" className="home-btn">
        Go to Home
      </Link>
    </div>
  );
};

export default Missing;
