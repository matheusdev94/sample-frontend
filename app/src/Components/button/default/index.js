import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 6em;
  position: relative;
  border: 1px ridge;
  outline: none;
  background-color: transparent;
  color: white;
  transition: 1s;
  border-radius: 0.3em;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
  display: flex;
  justify-content: center;
  height: 2em;

  &:after,
  &:before {
    content: "";
    position: absolute;
    width: 95%;
    transition: 0.5s;
    transform-origin: center;
    background-color: ${(props) => props.backgroundColor || "transparent"};
  }

  &:after {
    top: -10px;
    left: 3%;
    height: 40%;
  }

  &:before {
    top: 80%;
    left: 3%;
    height: 40%;
  }

  .text {
    color: gray;
    font-size: 1em;
    transition: 1s;
    align-self: center;
  }

  &:hover:before,
  &:hover:after {
    transform: scale(0);
  }

  &:hover {
    box-shadow: inset 0px 0px 5px white;
    .text {
      color: white;
      // font-size: 1.07em;
      transition: 0.1s;
    }
  }

  &:active {
    transition: 0.001s;
    box-shadow: inset 0px 0px 15px white;
    .text {
      color: white;
      // font-size: 0.9em;
      transition: 0.001s;
    }
  }
`;

export const Button = ({ action, text, backgroundColor }) => {
  return (
    <StyledButton onClick={action} backgroundColor={backgroundColor}>
      <p className="text">{text}</p>
    </StyledButton>
  );
};
