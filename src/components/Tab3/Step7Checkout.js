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
      <div sx={styles.absoluteBtnWrap}>
        <Tab3Checkout
          map={map}
          mapTitles={mapTitles}
          activeLayout={activeLayout}
          product={product}
          activeMapStyle={activeMapStyle}
          dataPrintful={dataPrintful}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
  },
  absoluteBtnWrap: {
    position: ["relative", null, null, "fixed"],
    bottom: "0px",
    left: "0px",
    zIndex: 10,
    margin: "20px 0",
    overflow: "visible",
    width: ["100%", "100%", "100%", "40%", "30%"],
  },
};

const CheckoutWrap = styled.div`
  width: 100%;
`;
