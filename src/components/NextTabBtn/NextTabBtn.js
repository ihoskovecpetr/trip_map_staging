/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, Text, Button, Link } from "theme-ui";
import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import { getFormattedPrice } from "../../LibGlobal/getFormattedPrice";

const getFormatedPriceString = (amount) => {
  return amount ? `| ${getFormattedPrice(amount)}` : "";
};

export default function NextTabBtn({
  onClick,
  width = "90%",
  children,
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
        sx={styles.btn}
        style={{
          width: width,
          backgroundColor: isDisabled && "lightGrey",
        }}
        onClick={onClickExtended}
      >
        {isLoading ? (
          <CircularProgress
            // width={30}
            classes={{
              root: classes.spinnerRoot,
            }}
          />
        ) : disabledText && isDisabled ? (
          disabledText
        ) : (
          <>
            {`${children}`}{" "}
            <span sx={styles.priceText}>{getFormatedPriceString(price)}</span>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    zIndex: 10,
    // margin: "20px 0",
  },
  btn: {
    backgroundColor: "cta_color",
    color: "white",
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: "600",
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
