import React, { Component } from "react";
import "./style.css";
export const MenuButton = ({ handleClick }) => {
  return (
    <div className="menu-container">
      <div className="first-layer">
        <span className="menu-icon-item"></span>
        <span className="menu-icon-item"></span>
        <span className="menu-icon-item"></span>
      </div>
      <div className="first-layer">
        <span className="menu-icon-item"></span>
        <span className="menu-icon-item"></span>
        <span className="menu-icon-item"></span>
      </div>
      <div className="first-layer">
        <span className="menu-icon-item"></span>
        <span className="menu-icon-item"></span>
        <span className="menu-icon-item"></span>
      </div>
    </div>
  );
};
