import React, { Component } from "react";
import "./style.css";
import wppImg from "../../../img/WhatsApp-removebg-preview-removebg-preview.png";

export const WhatsAppButton = () => {
  return (
    <div className="tooltip-container">
      <div className="tooltip">
        <div className="content">
          <div className="img"></div>
          <div className="details">
            <div className="title">Clique...</div>
            <div className="about">e inicie uma conversa no Whatsapp</div>
          </div>
        </div>
      </div>
      <div className="text">
        <a className="icon" href="#">
          <div className="layer">
            <span className="border"></span>
            <span className="border"></span>
            <span className="border"></span>
            <span className="border"></span>
            <span className="fab fa-linkedin">
              <img className="img-icon" src={wppImg}></img>
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};
