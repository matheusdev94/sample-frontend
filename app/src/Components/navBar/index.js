import React, { Component } from "react";
import styled from "styled-components";
import "./style.css";
import { BurgerButton } from "../button/burgerButton";
import { NavButton } from "../button/navButton";
import { Input } from "../input";
import { CgMenuGridR } from "react-icons/cg";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  position: sticky;
  background-color: transparent;
  color: black;
  justify-container: space-between;
  padding: 0.5em 0;
`;

const Devider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: sticky;
  background-color: transparent;
  color: black;
  justify-content: ${(props) => props.justifyContent};
  flex: ${(props) => props.portion || "1"};
  align-items: center;
`;

const MenuButton = styled.button`
  background: transparent;
  border-radius: 10px;
  height: 40px;
  width: 40px;
  border: none;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transition: 0.5s;
    box-shadow: 0px 0px 10px 1px white;
    background-color: #5e636a;
  }
  .menu-icon {
    font-size: 2em;
  }
`;

export const NavBar = ({ changeSideBarState }) => {
  return (
    <Container>
      <Devider portion={0} justifyContent="start">
        <MenuButton onClick={() => changeSideBarState()}>
          <HiOutlineMenuAlt2 className="menu-icon" color="lightgray" />
        </MenuButton>
      </Devider>
      <Devider portion={5} justifyContent="start">
        <NavButton text="Página Inicial" to="/" />
        <NavButton text="Sobre" to="/about" />
      </Devider>
      <Devider portion={2} justifyContent="center">
        <Input width="180px" />
      </Devider>
    </Container>
  );
};
