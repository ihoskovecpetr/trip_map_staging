/** @jsx jsx */
import React from "react";
import { jsx, Container, Box } from "theme-ui";
import styled from "styled-components";

import { useElementDimensions } from "../Hooks/useElementDimensions";

export default function IndexContainer() {
  const { height: headerHeight } = useElementDimensions("header");

  return (
    <section sx={{ marginTop: headerHeight }}>
      <ContainerBox headerHeight={headerHeight}>index</ContainerBox>
    </section>
  );
}

const styles = {
  containerBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: ["wrap", null, null, "nowrap"],
    height: "100%",
  },
};

const ContainerBox = styled.div`
  height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};
`;
