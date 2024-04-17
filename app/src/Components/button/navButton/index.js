import React, { Component } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { themeColors } from "../../../themes/styles";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MyNavButton = styled.button`
  margin: 0;
  &:hover {
    .text-navbar-btn {
      color: ${(prop) =>
        prop.theme === "dark" ? "white" : "rgb(173, 167, 167)"};
    }
  }
`;
export const NavButton = ({ text, to, Icon }) => {
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <div className="container">
      <Link className="nav-link" to={to}>
        <MyNavButton className="navButton" theme={themeMode}>
          <p className="text-navbar-btn">
            {Icon && <Icon className="nav-icon" />}
            {text}
          </p>
        </MyNavButton>
      </Link>
      <div className="bottom"></div>
    </div>
  );
};
