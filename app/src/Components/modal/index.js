import React, { Component, useEffect, useState } from "react";
import "./style.css";
import { BottomMarginButton } from "../button/bottomMarginButton";
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
  display: ${(props) => (props.visibility === "close" ? "none" : "")};
`;
export const Modal = ({ children, closeModal, hideButton }) => {
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
      className="wrapper"
      visibility={ModalState}
      onClick={(e) => {
        attentionHandler(e);
      }}
    >
      <div
        className="container-modal"
        onClick={(e) => {
          attentionHandler(e);
        }}
      >
        <div className={`box${attentionMode ? "-attention" : ""}`}>
          <Content>{children}</Content>
          <HorizontalDiv>
            {hideButton ? (
              <></>
            ) : (
              <BottomMarginButton text="OK" action={() => closeModal(false)} />
            )}
          </HorizontalDiv>
        </div>
      </div>
    </Wrapper>
  );
};
