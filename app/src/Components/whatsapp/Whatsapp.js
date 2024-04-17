import React, { Component } from "react";
import "./Whatsapp.css";
import wppImg from "../../img/WhatsApp-removebg-preview-removebg-preview.png";
import { themeColors } from "../../themes/styles";
import { useSelector } from "react-redux";
import { FcAssistant } from "react-icons/fc";

export const WhatsAppButton = () => {
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <div className="tooltip-container">
      <div className="tooltip">
        <div
          className="content-whatsapp"
          style={{
            backgroundColor: themeColors[themeMode].backgroundColor,
            color: themeColors[themeMode].textColor,
          }}
        >
          <div className="img">
            <FcAssistant size={"30px"} />
          </div>
          <div className="details">
            {/* <div
              className="title"
              style={{
                backgroundColor: themeColors[themeMode].backgroundColor,
                color: themeColors[themeMode].textColor,
              }}
            >
            </div> */}
            <div
              className="about"
              style={{
                backgroundColor: themeColors[themeMode].backgroundColor,
                color: themeColors[themeMode].textColor,
              }}
            >
              Clique para iniciar uma conversa no Whatsapp.
            </div>
          </div>
        </div>
      </div>
      <div className="text">
        <a className="icon">
          <div className="layer">
            <span className="border"></span>
            <span className="border"></span>
            <span className="border"></span>
            <span className="border"></span>
            <span
              className="fab fa-linkedin"
              style={{
                boxShadow: `0px 1px 45px ${themeColors[themeMode].shadowColor}`,
              }}
            >
              <img className="img-icon" src={wppImg} alt="whatsapp-icon" />
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};
