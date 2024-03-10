import React from "react";
import { Link } from "react-router-dom";

const Lounge = () => {
  return (
    <div className="content">
      <h1>Lounge</h1>
      <Link to="/" className="home-btn">
        Go to Home
      </Link>
    </div>
  );
};

export default Lounge;
