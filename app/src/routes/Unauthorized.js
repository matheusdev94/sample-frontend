import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="content">
      <h2>Unauthorized</h2>
      <Link to="/" className="home-btn">
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
