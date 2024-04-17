import React, { Component } from "react";
import "./style.css";

export const BottomMarginButton = ({ text, action }) => {
  return (
    <div className="container">
      <button className="bottom-marged-button" onClick={() => action()}>
        <p className="text">{text}</p>
      </button>
      <div className="bottom"></div>
    </div>
  );
};
