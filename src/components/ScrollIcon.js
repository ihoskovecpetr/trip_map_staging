import React from "react";
import styled, { keyframes } from "styled-components";

const ScrollIcon = () => {
  return (
    <Container class="container">
      <Field class="field">
        <Mouse class="mouse"></Mouse>
      </Field>
    </Container>
  );
};

const wheel = keyframes`
  0% {
		opacity: 1;
		top: 10px;
	}
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
		top: 60px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 300px;
`;

const Mouse = styled.div`
  width: 50px;
  height: 90px;
  border: 3px solid #ffffff;
  border-radius: 60px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 5px grey;

  &::before {
    content: "";
    width: 16px;
    height: 16px;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    border-radius: 50%;
    opacity: 1;
    animation: ${wheel} 2s infinite;
    -webkit-animation: ${wheel} 2s infinite;
  }
`;

export default ScrollIcon;
