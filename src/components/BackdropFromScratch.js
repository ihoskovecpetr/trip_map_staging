import React from "react";
import styled from 'styled-components'

export default function BackdropFromScratch({children, open, onClick}) {

  if(!open){
    return null
  }
  
  return (
   <BackdropContainer onClick={onClick ?? null}>
    {children}
   </BackdropContainer>
  );
}

const BackdropContainer = styled.div`
    z-Index: 99;
    position: fixed;
    display: flex;
    align-Items: center;
    justify-Content: center;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-Color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent
`;
