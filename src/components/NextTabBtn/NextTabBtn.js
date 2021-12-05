/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx } from "theme-ui";
import { makeStyles } from "@material-ui/core/styles";
import { string, bool, number, func, node } from "prop-types";
import styled from "styled-components";

import { color } from "utils";
import UnderlineLoader from "components/UnderlineLoader";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";

const getFormatedPriceString = (amount) => {
  return amount ? `| ${getFormattedPrice(amount)}` : "";
};

function NextTabBtn({
  onClick,
  children,
  width = "100%",
  isLoadingOnClick,
  isDisabled,
  disabledText,
  margin,
  price,
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  function onClickExtended() {
    if (isLoading || isDisabled) {
      return;
    }

    if (isLoadingOnClick) {
      setIsLoading(true);
    }
    onClick();
  }

  return (
    <Container margin={margin}>
      <div
        sx={styles.button}
        style={{
          width: width,
          backgroundColor: isDisabled && "lightGrey",
        }}
        onClick={onClickExtended}
      >
        {disabledText && isDisabled ? (
          <TextWrap>
            {disabledText} <UnderlineLoader />
          </TextWrap>
        ) : (
          <TextWrap>
            {`${children}`}{" "}
            {price && <span>{price ? getFormatedPriceString(price) : ""}</span>}
            {isLoading && <UnderlineLoader />}
          </TextWrap>
        )}
      </div>
    </Container>
  );
}

const TextWrap = styled.div`
  transform: translateX(0);
  color: white;
  display: inline-block;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
  padding: 0;
  margin: ${({ margin }) => margin};
`;

const styles = {
  button: {
    backgroundColor: "rgb(239, 17, 67)",
    padding: "8px 0",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: 400,
    textTransform: "none",
    letterSpacing: "1.5px",
    transform: "translateX(0)",
  },
};

NextTabBtn.propTypes = {
  onClick: func.isRequried,
  children: node.isRequired,
  width: string,
  isLoadingOnClick: bool,
  isDisabled: bool,
  disabledText: bool,
  margin: string,
  price: number,
};

export default NextTabBtn;
