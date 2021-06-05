/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, Box, Heading, Text, Button, Link } from "theme-ui";
import styled from "styled-components";

import { useIsMobile } from "../../Hooks/useIsMobile";
import { useElementDimensions } from "../../Hooks/useElementDimensions";

import Tab1 from "../Tab1/tab1";
import Tab2 from "../Tab2/tab2";
import Tab3 from "../Tab3/tab3";

const TAB_VALUES = {
  ONE: "LOKALITA",
  TWO: "ROZLOŽENÍ & BARVY",
  THREE: "ROZMĚRY & PLATBA",
};

export default function SetupColumn({
  map,
  mapCoordinates,
  setMapCoordinates,
  activeFrame,
  setActiveLayout,
  activeMapStyle,
  setActiveMapStyle,
  mapTitles,
  setMapTitles,
  product,
  setProduct,
}) {
  const [activeTab, setActiveTab] = useState(TAB_VALUES.ONE);
  const { isMobile } = useIsMobile();

  const { height: headerHeight } = useElementDimensions("header");

  const handleChange = (newValue) => {
    // if (isMobile) {
    const yCoordTabs =
      document.querySelector("#tab_wrap_wrap").getBoundingClientRect().top -
      100;

    // window.scrollBy({
    //   top: yCoordTabs,
    //   left: 0,
    //   behavior: "smooth",
    // });

    setActiveTab(newValue);
    // window.setTimeout(function () {
    // }, 500);

    // }
  };

  return (
    <div sx={{ width: "100%", height: "100%" }}>
      <div sx={styles.TabWrapWrap} id="tab_wrap_wrap">
        <div sx={styles.TabWrap}>
          <div
            sx={styles.Tab}
            className={activeTab === TAB_VALUES.ONE && "active"}
            onClick={() => handleChange(TAB_VALUES.ONE)}
          >
            <p>{TAB_VALUES.ONE}</p>
          </div>
          <div
            sx={styles.Tab}
            className={activeTab === TAB_VALUES.TWO && "active"}
            onClick={() => handleChange(TAB_VALUES.TWO)}
          >
            <p>{TAB_VALUES.TWO}</p>
          </div>
          <div
            sx={styles.Tab}
            className={activeTab === TAB_VALUES.THREE && "active"}
            onClick={() => handleChange(TAB_VALUES.THREE)}
          >
            <p>{TAB_VALUES.THREE}</p>
          </div>
        </div>
      </div>
      {activeTab === TAB_VALUES.ONE && (
        <TabContentWrap
          className={activeTab === TAB_VALUES.ONE && "active"}
          sx={styles.tabBody}
        >
          <Tab1
            map={map}
            mapCoordinates={mapCoordinates}
            setMapCoordinates={setMapCoordinates}
            setMapTitles={setMapTitles}
            nextTab={() => handleChange(TAB_VALUES.TWO)}
          />
        </TabContentWrap>
      )}
      {activeTab === TAB_VALUES.TWO && (
        <TabContentWrap
          className={`${activeTab === TAB_VALUES.TWO && "active"}`}
          sx={styles.tabBody}
        >
          <Tab2
            map={map}
            activeFrame={activeFrame}
            setActiveLayout={setActiveLayout}
            activeMapStyle={activeMapStyle}
            setActiveMapStyle={setActiveMapStyle}
            nextTab={() => handleChange(TAB_VALUES.THREE)}
            product={product}
            setProduct={setProduct}
          />
        </TabContentWrap>
      )}
      {activeTab === TAB_VALUES.THREE && (
        <TabContentWrap
          className={activeTab === TAB_VALUES.THREE && "active"}
          sx={styles.tabBody}
        >
          <Tab3
            map={map}
            mapTitles={mapTitles}
            activeLayout={activeFrame}
            product={product}
            setProduct={setProduct}
            activeMapStyle={activeMapStyle}
          />
        </TabContentWrap>
      )}
    </div>
  );
}

const styles = {
  TabWrapWrap: {
    position: "relative",
    zIndex: 10,
  },
  TabWrap: {
    display: "flex",
    position: "absolute",
    width: "100%",
    backgroundColor: "#ffffff",
  },
  Tab: {
    width: "33.33%",
    px: "10px",
    py: [null, null, "10px"],
    display: "flex",
    justifyContent: "center",
    fontWeight: 600,
    color: "rgba(0,0,0,0.35)",
    cursor: "pointer",
    borderBottom: "1px solid lightgrey",
    "&.active": {
      borderBottom: "2px solid",
      borderColor: "primary",
      color: "primary",
    },
    "&:hover": {
      backgroundColor: "#00000006",
    },
    "> p": {
      margin: "auto",
      textAlign: "center",
      // fontFamily: "Arial",
      // fontWeight: 400,
    },
  },
  tabBody: {
    paddingTop: ["50px", "50px", "60px", "80px"],
    display: "none",
    height: ["unset", "unset", "100%"],
    overflow: "scroll",
    backgroundColor: "background_secondary",
    "&.active": {
      display: "block",
    },
    "@media screen and (max-width: 768px)": {
      height: "unset",
    },
  },
};

const TabContentWrap = styled.div`
  @media (max-width: 768px) {
    height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};
  }
`;
