import React, { Component } from "react";
import "./style.css";
export const BurgerButton = ([handleClick]) => {
  return (
    <>
      <input
        hidden=""
        className="check-icon"
        id="check-icon"
        name="-check-icon"
        type="checkbox"
        onClick={() => handleClick()}
      />
      <label className="icon-menu" for="check-icon">
        <div className="bar bar--1"></div>
        <div className="bar bar--2"></div>
        <div className="bar bar--3"></div>
      </label>
    </>
  );
};
