/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";
import styled from "styled-components";

import { VARIANTS_PRINTFUL } from "../../constants/constants";
import Tab3Checkout from "./tab3Checkout";

import { useGetDataPrintful } from "../../Hooks/useGetDataPrintful";
import { useIsMobile } from "../../Hooks/useIsMobile";

export default function Step6FinishVariant({
  map,
  mapTitles,
  activeLayout,
  product,
  activeMapStyle,
}) {
  const { dataPrintful } = useGetDataPrintful(
    VARIANTS_PRINTFUL.map((variant) => variant.id)
  );

  return (
    <div sx={styles.container}>
      <CheckoutWrap>
        <Tab3Checkout
          map={map}
          mapTitles={mapTitles}
          activeLayout={activeLayout}
          product={product}
          activeMapStyle={activeMapStyle}
          dataPrintful={dataPrintful}
        />
      </CheckoutWrap>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    // padding: "0 10px",
    // pb: "70px",
  },
  headingDesc: {
    fontWeight: 500,
    textAlign: "left",
    margin: "20px 0",
    color: "grey",
    letterSpacing: "1.1px",
  },
  sizeWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  sizeItem: {
    margin: "10px",
    padding: "4px",
    // width: ["31%", "31%", "31%", "31%", "31%", "20%"],
    // margin: ["1%", "1%", "1%", "1%", "1%", "1%"],
    border: "1px solid transparent",
    cursor: "pointer",
    backgroundColor: "white",
    boxShadow: "0 0 5px rgba(0,0,0,0.3)",
    "&.active": {
      border: "1px solid",
      borderColor: "cta_color",
      color: "black",
      transform: "scale(1.2)",
      boxShadow: "0 0 8px rgba(0,0,0,0.5)",
    },
    "&.disabled": {
      border: "0px",
      color: "lightGrey",
    },
  },
  itemDimensions: {
    margin: 0,
    paddingTop: "5px",
    display: "block",
    textAlign: "center",

    // width: "100%",
  },
  itemUnit: {
    margin: 0,
    display: "block",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: "10px",
  },
  materialDesc: {
    textAlign: "left",
    px: "10px",
  },

  loaderWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    minHeight: "20vh",
    justifyContent: "center",
    alignItems: "center",
  },

  variantWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    minHeight: "20vh",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  borderWrap: {
    // border: "2px solid white",
    boxShadow: "1px 1px 4px rgba(0,0,0,0.2)",
    // borderRadius: "2px",
    height: "100%",
    width: ["31%", "31%", "31%", "31%", "31%", "31%"],
    margin: ["1%", "1%", "1%", "1%", "1%", "1%"],
    // padding: "4px",
    // height: "200px",
    // borderRadius: "10px",
    display: "flex",
    cursor: "pointer",
    flexDirection: "column",
    backgroundColor: "white",
    overflow: "hidden",

    "&.active": {
      border: "1px solid",
      borderColor: "cta_color",
      transform: "scale(1.1)",
      zIndex: 1,
      boxShadow: "0 0 15px rgba(0,0,0,0.5)",
    },
  },
  imageWrap: {
    position: "relative",
    // height: "80%",
    display: "flex",
    justifyContent: "center",
  },
  variantImage: {
    position: "relative",
    height: "170px",
  },
  // openImageIcon: {
  //   position: "absolute",
  //   top: 0,
  //   right: 0,
  //   backgroundColor: "#00000029",
  //   borderRadius: "2px",
  //   cursor: "pointer",
  // },
  textsWrap: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "flex-start",
    padding: "5px",
    textAlign: "left",
  },
  variantPrice: {
    margin: 0,
    // px: "5px",
    // mx: "2px",
    // position: "absolute",
    // bottom: 0,
    // right: 0,
    color: "primary",
    fontWeight: 600,
    // backgroundColor: "#ffffffe9",
    borderRadius: "2px",
    cursor: "pointer",
    // color: "white",

    // "&.active": {
    //   color: "#fe6769",
    // },
  },
  variantDesc: {
    lineHeight: 1.2,
    fontSize: "0.8rem",
    fontWeight: 500,
    paddingBottom: "5px",
    // borderBottom: "1px solid lightGrey",
    margin: 0,
  },
  variantDelivery: {
    color: "muted",
    m: 0,
    fontWeight: 600,
    fontSize: "0.6rem",
  },
};

const CheckoutWrap = styled.div`
  // position: fixed;
  // top: 85vh;
  // left: 0;
  // height: 0;
  width: 100%;

  // @media (max-width: 768px) {
  //   height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};
  //   width: 40%;
  //   top: 90vh;
  // }
`;
