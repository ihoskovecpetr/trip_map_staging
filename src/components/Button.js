import React from "react";
import styled from "styled-components";
import { node, bool, string, func } from "prop-types";

import CustomLoader from "./CustomLoader";

import { color, font, fontSize, fontWeight } from "utils";

const StyledButton = styled.button`
  position: relative;
  background: ${color("cta_color")};
  border: solid 2px
    ${({ withBorder }) =>
      withBorder ? color("background_almost_white") : "transparent"};
  
  border-radius: 5px;
  color: ${({ inverted, primaryColor }) =>
    inverted ? color("background_almost_white") : primaryColor};
  cursor: pointer;
  font-size: ${({ textSize }) => fontSize(textSize ?? "default")};
  padding: 1.25rem 2rem;
  min-height: 4rem;
  min-width: 12.5rem;
  transition: background-color 0.2s ease-in-out;
  font-weight: ${fontWeight("bold")};

  &:disabled {
    border-color: ${color("background_almost_white")};
    color: ${color("background_almost_white")};
    cursor: default;
  }

  &:enabled:hover {
    border-color: ${({ withBorder, primaryColor }) =>
      withBorder ? primaryColor : color("background_almost_white")};

    background: ${({ inverted, theme, primaryColor }) =>
      inverted ? theme.colors.white : primaryColor};

    color: ${({ inverted, theme, primaryColor }) =>
      inverted ? primaryColor : theme.colors.white}};
  }
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
      {children}
      {/* {!isLoading && children} */}
      {/* {isLoading && (
        <StyledLoadingCircle
          width="48px"
          height="48px"
          // primaryColor={primaryColor}
          inverted={inverted}
        >
          <CustomLoader />
        </StyledLoadingCircle>
      )} */}
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
