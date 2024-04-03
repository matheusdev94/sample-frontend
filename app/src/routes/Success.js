import React from "react";
import { Link } from "react-router-dom";
import "./Success.css";

const SuccessRegistration = () => {
  return (
    <div className="success-wrapper">
      {/* <div className=""> */}
      <h1>Success!</h1>
      <Link className="link" to="/login">
        Go to Login
      </Link>
      {/* </div> */}
    </div>
  );
};

export default SuccessRegistration;
