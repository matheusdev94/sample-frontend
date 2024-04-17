import React from "react";
import styled, { keyframes } from "styled-components";
import { NavButton } from "../../button/navButton";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { GiPaintBucket } from "react-icons/gi";
import { RiContactsBook2Fill } from "react-icons/ri";
import { TfiGallery } from "react-icons/tfi";
import "./LeftSidebar.css";
import { useSelector } from "react-redux";
import { themeColors } from "../../../themes/styles";

import logoLight from "../../../img/logo/logo300.png";
import logoDark from "../../../img/logo/logo-dark-300.png";
// import logoLight from "../../../img/logo/logo-light.png";

const slideIn = keyframes`
  from {
    right: -300px;
  }
  to {
    right: 0;
  }
`;

const Container = styled.div`
  left: ${(props) => (props.sideBarState === "open" ? "0" : "-300px")};
  animation: ${(props) => (props.sideBarState === "open" ? slideIn : "none")}
    0.3s;
`;

const Logo = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 1.5rem;
`;

const ButtonList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: ${(props) => (props.sideBarState === "open" ? "flex" : "none")};
`;

const LeftSideBar = ({ sideBarState, changeSideBarState }) => {
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <>
      <Wrapper
        sideBarState={sideBarState}
        onClick={() => changeSideBarState()}
      ></Wrapper>
      <Container
        className="left-sidebar-container"
        sideBarState={sideBarState}
        style={{
          color: themeColors[themeMode].textColor,
          backgroundColor: themeColors[themeMode].backgroundColor,
        }}
      >
        <button
          className="close-left-sidebar-button"
          onClick={() => changeSideBarState()}
        >
          <p className="text-close-button">X</p>
        </button>
        <div className="logo-menu-bar-container">
          <img
            className="logo-menu-bar"
            // src={logo}
            src={themeMode === "light" ? logoLight : logoDark}
            alt="logo-icon"
          />
        </div>
        <ButtonList className="left-sidebar-list-button">
          <NavButton
            className="nav-button"
            text="Página Inicial"
            to="/"
            Icon={FaHome}
          />
          <NavButton
            className="nav-button"
            text="Serviços"
            to="/servicos"
            Icon={GiPaintBucket}
          />
          <NavButton
            className="nav-button"
            text="Contato"
            to="/contato"
            Icon={RiContactsBook2Fill}
          />
          <NavButton
            className="nav-button"
            text="Galeria"
            to="/galeria"
            Icon={TfiGallery}
          />
        </ButtonList>
      </Container>
    </>
  );
};

export default LeftSideBar;
