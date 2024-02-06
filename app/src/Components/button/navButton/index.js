import React, { Component } from "react";
import "./style.css";
import { Link } from "react-router-dom";

export const NavButton = ({ text, to }) => {
  return (
    <div className="container">
      <Link className="nav-link" to={to}>
        <button className="navButton">
          <p className="text">{text}</p>
        </button>
      </Link>
      <div className="bottom"></div>
    </div>
  );
};
