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
    <div sx={styles.container} style={{ margin: margin }}>
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
            {price && (
              <span sx={styles.priceText}>{getFormatedPriceString(price)}</span>
            )}
            {isLoading && <UnderlineLoader />}
          </TextWrap>
        )}
      </div>
    </div>
  );
}

const TextWrap = styled.div`
  transform: translateX(0);
  color: ${color("primary")};
  display: inline-block;
`;

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    zIndex: 10,
    padding: "0",
  },
  button: {
    backgroundColor: "cta_color",
    // color: "white",
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: 600,
    textTransform: "none",
    letterSpacing: "1.5px",
    transform: "translateX(0)",
  },
  priceText: {
    color: "primary",
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
