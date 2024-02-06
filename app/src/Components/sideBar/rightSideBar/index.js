import React from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    right: -300px;
  }
  to {
    right: 0;
  }
`;

const Container = styled.div`
  width: 300px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: ${(props) => (props.sideBarState === "open" ? "0" : "-300px")};
  background-color: #333;
  color: white;
  transition: right 0.3s;
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

const ButtonListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

const CloseButton = styled.button`
  width: 25px;
  height: 25px;
  margin: 10px;
  position: absolute;
  right: 0;
  cursor: pointer;
  border-radius: 5px;
  border: 2px rigid;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.sideBarState === "open" ? "flex" : "none")};
`;

const RightSideBar = ({ sideBarState, changeSideBarState }) => {
  return (
    <>
      <Wrapper
        sideBarState={sideBarState}
        onClick={() => changeSideBarState()}
      ></Wrapper>
      <Container sideBarState={sideBarState}>
        <CloseButton onClick={() => changeSideBarState()}>X</CloseButton>
        <Logo>Logo</Logo>
        <ButtonList>
          <ButtonListItem>Button 1</ButtonListItem>
          <ButtonListItem>Button 2</ButtonListItem>
          <ButtonListItem>Button 3</ButtonListItem>
        </ButtonList>
      </Container>
    </>
  );
};

export default RightSideBar;
