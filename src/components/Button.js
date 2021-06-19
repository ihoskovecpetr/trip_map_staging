import React from "react";
import styled from "styled-components";
import { node, bool, string, func } from "prop-types";

import CustomLoader from "./CustomLoader";

// import { usePrimaryColor } from "@hooks/usePrimaryColor";
import { color, font, fontSize, fontWeight } from "../utils";

const StyledButton = styled.button`
  position: relative;
  background: ${color("cta_color")};
  border: solid 2px
    ${({ withBorder }) =>
      withBorder ? color("muted") : color("background_white")};
  border-radius: 5px;
  color: ${({ inverted, primaryColor }) =>
    inverted ? color("background_white") : primaryColor};
  cursor: pointer;
  font-family: ${font("citroen")};
  font-size: ${({ textSize }) => fontSize(textSize ?? "default")};
  padding: 1.25rem 2rem;
  min-height: 4rem;
  min-width: 12.5rem;
  margin: 0.5rem 0;
  text-transform: uppercase;
  transition: background-color 0.2s ease-in-out;
  font-weight: ${fontWeight("bold")};

  &:disabled {
    border-color: ${color("muted")};
    color: ${color("muted")};
    cursor: default;
  }

  &:enabled:hover {
    border-color: ${({ withBorder, primaryColor }) =>
      withBorder ? primaryColor : color("background_white")};

    background: ${({ inverted, theme, primaryColor }) =>
      inverted ? theme.colors.white : primaryColor};

    color: ${({ inverted, theme, primaryColor }) =>
      inverted ? primaryColor : theme.colors.white}};
  }
`;

const StyledLoadingCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Button = ({
  children,
  disabled,
  isLoading = false,
  customColor,
  inverted,
  ...props
}) => {
  // const primaryColor = customColor ?? usePrimaryColor();

  return (
    <StyledButton
      // primaryColor={primaryColor}
      disabled={disabled || isLoading}
      inverted={inverted}
      {...props}
    >
      {!isLoading && children}
      {isLoading && (
        <StyledLoadingCircle
          width="48px"
          height="48px"
          // primaryColor={primaryColor}
          inverted={inverted}
        >
          <CustomLoader />
        </StyledLoadingCircle>
      )}
    </StyledButton>
  );
};

Button.propTypes = {
  customColor: string,
  disabled: bool,
  children: node.isRequired,
  inverted: bool,
  isLoading: bool,
  withBorder: bool,
  onClick: func,
};

export default Button;
