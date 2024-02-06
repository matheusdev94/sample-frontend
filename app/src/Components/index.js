import React, { useState } from "react";
import AppRouter from "../AppRouter";
import LeftSideBar from "./sideBar/leftSideBar";
import styled from "styled-components";
import Footer from "./footer";
import { NavBar } from "./navBar";
import { WhatsAppButton } from "./button/whatsapp";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
`;

export const Components = () => {
  const [sideBarState, setSideBarState] = useState("close");

  const changeSideBarState = () => {
    if (sideBarState === "open") {
      setSideBarState("close");
    } else {
      setSideBarState("open");
    }
  };
  return (
    <Container>
      <NavBar changeSideBarState={changeSideBarState} />
      <LeftSideBar
        sideBarState={sideBarState}
        changeSideBarState={changeSideBarState}
      />
      <AppRouter />
      <Footer />
      <WhatsAppButton />
    </Container>
  );
};
