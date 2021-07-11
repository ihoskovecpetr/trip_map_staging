/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx } from "theme-ui";
import { makeStyles } from "@material-ui/core/styles";
import { string, bool, number, func, node } from "prop-types";
import styled from "styled-components";

import CircularProgress from "@material-ui/core/CircularProgress";
import UnderlineLoader from "components/UnderlineLoader";
import { getFormattedPrice } from "../../LibGlobal/getFormattedPrice";

const getFormatedPriceString = (amount) => {
  return amount ? `| ${getFormattedPrice(amount)}` : "";
};

function NextTabBtn({
  onClick,
  children,
  width = "90%",
  isLoadingOnClick,
  isDisabled,
  disabledText,
  margin,
  price,
}) {
  const classes = useStyles();

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
        {/* {isLoading ? (
          <CircularProgress
            // width={30}
            classes={{
              root: classes.spinnerRoot,
            }}
          />
        ) : */}
        {disabledText && isDisabled ? (
          disabledText
        ) : (
          <TextWrap>
            {`${children}`}{" "}
            <span sx={styles.priceText}>{getFormatedPriceString(price)}</span>
            {isLoading && <UnderlineLoader />}
          </TextWrap>
        )}
      </div>
    </div>
  );
}

const TextWrap = styled.div`
  transform: translateX(0);
`;

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    zIndex: 10,
    // margin: "20px 0",
  },
  button: {
    backgroundColor: "cta_color",
    color: "white",
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: "200",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    transform: "translateX(0)",
  },
  priceText: {
    color: "primary",
  },
};

const useStyles = makeStyles((theme) => ({
  spinnerRoot: {
    height: "30px !important",
    width: "30px !important",
    color: "white",
  },
}));

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
