import React, { Component } from "react";
import styled from "styled-components";
import "./Navbar.css";
import { NavButton } from "../button/navButton";
import { SearchInput } from "../searchInput";

import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { GiPaintBucket } from "react-icons/gi";
import { RiContactsBook2Fill } from "react-icons/ri";
import { TfiGallery } from "react-icons/tfi";

import { useSelector } from "react-redux";
import { themeColors } from "../../themes/styles";

import { FaFacebook } from "react-icons/fa";

import imgWhatsapp from "../../img/WhatsApp-removebg-preview-removebg-preview.png";
import imgFacebook from "../../img/Facebook_icon.png";
import imgInstagram from "../../img/Instagram-Icon.png";

import ColorMode from "../theme/Theme";
import News from "../news/News";

export const NavBar = ({ changeSideBarState }) => {
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <nav
      className="navbar-container"
      style={{
        color: themeColors[themeMode].textColor,
        backgroundColor: themeColors[themeMode].backgroundColor,
      }}
    >
      <div className="navbar-contacts">
        <p style={{ whiteSpace: "nowrap" }}>
          Telefone:
          <a href={process.env.REACT_APP_WHATSAPP_LINK} target="_blank">
            {process.env.REACT_APP_WHATSAPP}
          </a>
        </p>
        <p style={{ margin: "0" }}>Email:</p>
        <a
          href={`mailto:${process.env.REACT_APP_EMAIL}`}
          style={{ whiteSpace: "nowrap" }}
        >
          <p style={{ marginLeft: "3px" }}> {process.env.REACT_APP_EMAIL}</p>
        </a>
        <div className="navbar-icons">
          <a
            href={process.env.REACT_APP_FACEBOOK_LINK}
            target="_blank"
            style={{ background: "transparent", border: "none" }}
          >
            <img
              className="navbar-contact-icon"
              src={imgFacebook}
              alt="facebook-icon"
            />
          </a>
          <a
            href={process.env.REACT_APP_WHATSAPP_LINK}
            target="_blank"
            style={{ background: "transparent", border: "none" }}
          >
            <img
              className="navbar-contact-icon"
              src={imgWhatsapp}
              alt="whatsapp-icon"
            />
          </a>
          <a
            href={process.env.REACT_APP_INSTAGRAM_LINK}
            target="_blank"
            style={{ background: "transparent", border: "none" }}
          >
            <img
              className="navbar-contact-icon"
              src={imgInstagram}
              alt="instagram-icon"
            />
          </a>
        </div>
      </div>

      <div className="navbar-components-container">
        <div className="menu-button" onClick={() => changeSideBarState()}>
          <HiOutlineMenuAlt2 className="menu-icon" />
        </div>
      </div>
      <div className="navbar-components-container">
        <div className="nav-buttons">
          <NavButton className="nav-button" text="Home" to="/" Icon={FaHome} />
          <NavButton className="nav-button" text="Serviços" to="/servicos" />
          <NavButton className="nav-button" text="Contato" to="/contato" />
          <NavButton className="nav-button" text="Galeria" to="/galeria" />
        </div>
      </div>
      <ColorMode />
    </nav>
  );
};
