import React, { Component, useEffect, useState } from "react";
import "./style.css";
import { CustomButton } from "../button/customButon";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: horizontal;
  justify-content: space-around;
`;
const Wrapper = styled.div`
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.visibility === "close" ? "none" : "")};
`;
export const Modal = ({ children, closeModal }) => {
  const [attentionMode, setAttentionMode] = useState();
  const [ModalState, setModalState] = useState();

  useEffect(() => {
    console.log(1);
    if (attentionMode) {
      setTimeout(() => {
        setAttentionMode(false);
      }, 1000);
    }
  }, [attentionMode]);
  const attentionHandler = (e) => {
    if (e.target === e.currentTarget) {
      setAttentionMode(true);
    }
  };
  return (
    <Wrapper
      visibility={ModalState}
      onClick={(e) => {
        attentionHandler(e);
      }}
    >
      <div
        className="container"
        onClick={(e) => {
          attentionHandler(e);
        }}
      >
        <div className={`box${attentionMode ? "-attention" : ""}`}>
          <Content>{children}</Content>
          <HorizontalDiv>
            <CustomButton text="OK" />
            <CustomButton text="Close" action={closeModal} />
          </HorizontalDiv>
        </div>
      </div>
    </Wrapper>
  );
};
