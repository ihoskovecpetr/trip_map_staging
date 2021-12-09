/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react";
import { jsx, Box } from "theme-ui";
import TabsRoot from "components/Tabs/TabsRoot";
import MapContainer from "components/canvas/mapContainer";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { useIsMobile } from "Hooks/useIsMobile";
import { useElementDimensions } from "Hooks/useElementDimensions";
import { drawLayout } from "LibGlobal/drawLayout";
import { prepareTextInput } from "LibGlobal/prepareTextInput";
import { getUpdatedMapSizes } from "LibGlobal/getUpdatedMapSizes";
import { getCenteringLayoutDimensions } from "LibGlobal/getCenteringLayoutDimensions";
import { getVariantObject } from "LibGlobal/getVariantObject";
import { getLayoutColors } from "LibGlobal/getLayoutColors";
import { setDevicePixelRatio } from "LibGlobal/setDevicePixelRatio";
import { color, mobile, desktop } from "utils";
import { useScreenSize } from "Hooks/useScreenSize";

import {
  useTitlesSelector,
  useProductSelector,
  useActiveLayoutSelector,
  useMapCoordinatesSelector,
  useActiveMapStyleSelector,
} from "redux/order/reducer";

import {
  setNewTitle,
  setNewSubtitle,
  setMapZoomAction,
} from "redux/order/actions";

import {
  MAP_STYLES,
  OUTSIDE_FRAME_CM,
  DEFAULT_FONT_WEIGHT_THIN,
  RUNTIME_PIXEL_RATIO,
  TITLE_NAMES,
} from "../constants/constants";

let map;
let trueMapCanvasElement;
let layoutCanvas;
let frameDiv;
let inputWrap;
let headlineInput;
let subtitleInput;

let canvasMap;
let ctxMap;
let mapWrapper;

const resizeLayout = ({
  cvsLayout,
  cvsMap,
  activeLayout: activeLayoutName,
  product,
  mapTitles,
  activeMapStyleName,
}) => {
  Object.assign(cvsLayout.style, {
    display: "none",
  });

  cvsLayout.setAttribute("width", cvsMap.width);
  cvsLayout.setAttribute("height", cvsMap.height);

  var ctxFrame = cvsLayout.getContext("2d");

  drawLayout(ctxFrame, {
    width: cvsMap.width,
    height: cvsMap.height,
    activeLayoutName,
    mapTitles: mapTitles,
    product,
    activeMapStyleName,
    localPixelRatio: RUNTIME_PIXEL_RATIO,
  });

  Object.assign(cvsLayout.style, {
    position: "absolute",
    pointerEvents: "none",
    display: "block",
    top: 0,
    left: 0,
    width: `${cvsMap.width / RUNTIME_PIXEL_RATIO + 1}px`,
    height: `${cvsMap.height / RUNTIME_PIXEL_RATIO + 1}px`,
  });
};

const resizeFrameDiv = ({ productRef, mapAvailSpaceRef }) => {
  const variantObj = getVariantObject(productRef.current.variantId);
  let frameWidthKoefficient;
  let baseLongerSide;

  if (productRef.current.sizeObject.ratio > 1) {
    frameWidthKoefficient =
      OUTSIDE_FRAME_CM / productRef.current.sizeObject.height;
  } else {
    frameWidthKoefficient =
      OUTSIDE_FRAME_CM / productRef.current.sizeObject.width;
  }

  const { updHeight, updWidth } = getUpdatedMapSizes({
    ratio: productRef.current.sizeObject.ratio,
    mapWrapWrapHeight: mapAvailSpaceRef.current.height,
    mapWrapWrapWidth: mapAvailSpaceRef.current.width,
  });

  if (updHeight > updWidth) {
    baseLongerSide = updHeight;
  } else {
    baseLongerSide = updWidth;
  }

  if (variantObj) {
    const extraFrame = baseLongerSide * frameWidthKoefficient;

    Object.assign(trueMapCanvasElement.style, {
      outline: `${extraFrame}px solid ${variantObj.frameColor}`,
    });
  }
};

const addZoom = (map) => () => {
  map.flyTo({ zoom: map.getZoom() + 0.3 });
};

const subtractZoom = (map) => () => {
  map.flyTo({ zoom: map.getZoom() - 0.3 });
};

const resizeInputs = ({
  mapTitles,
  saveTitlesValue,
  mapHeight,
  mapWidth,
  layout,
  activeMapStyleName,
  productRef,
}) => {
  const activeStyleObj = MAP_STYLES[activeMapStyleName];

  const { textLayoutColor } = getLayoutColors({
    product: productRef.current,
    mapStyleObject: activeStyleObj,
  });

  prepareTextInput({
    element: headlineInput,
    name: "heading",
    textSize: mapTitles.heading?.size,
    textValue: mapTitles.heading?.text,
    onInput: saveTitlesValue,
    height: mapHeight,
    width: mapWidth,
    layout,
    color: textLayoutColor,
  });
  prepareTextInput({
    element: subtitleInput,
    name: "subtitle",
    textSize: mapTitles.subtitle?.size,
    textValue: mapTitles.subtitle?.text,
    fontWeight: DEFAULT_FONT_WEIGHT_THIN,
    onInput: saveTitlesValue,
    height: mapHeight,
    width: mapWidth,
    layout,
    color: textLayoutColor,
  });
};

const resizeInputsWrap = ({ productRef, layout, canvasMap }) => {
  const { paddingWidth, bottomBannerHeight } = getCenteringLayoutDimensions({
    product: productRef.current,
    layout,
    elWidth: canvasMap?.width,
    elHeight: canvasMap?.height,
  });

  Object.assign(inputWrap.style, {
    width: "100%",
    height: bottomBannerHeight / RUNTIME_PIXEL_RATIO + "px", // `${frameCanvas.height}px`,
    marginBottom: paddingWidth / RUNTIME_PIXEL_RATIO + "px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  });
};

export default function StudioRootContainer() {
  const dispatch = useDispatch();

  const productRedux = useProductSelector();
  const mapTitles = useTitlesSelector();
  const activeLayoutRedux = useActiveLayoutSelector();
  const mapCenterCoordinates = useMapCoordinatesSelector();
  const activeMapStyleName = useActiveMapStyleSelector();
  const [mapInstance, setMapInstance] = useState(null);
  const [snapMapInstance, setSnapMapInstance] = useState(null);
  const { height: screenHeight } = useScreenSize();

  const { height: headerHeight } = useElementDimensions("header");

  const {
    height: mapAvailSpaceHeight,
    width: mapAvailSpaceWidth,
  } = useElementDimensions("map_available_space_id");

  const {
    height: mapWrapperHeight,
    width: mapWrapperWidth,
  } = useElementDimensions("map_wrap_id");

  const { isMobile } = useIsMobile();

  const mapTitlesRef = useRef(mapTitles); // Using this due to snapshot state of state in hooks
  const layoutRef = useRef(activeLayoutRedux);
  const mapCoordinatesRef = useRef(mapCenterCoordinates);
  const productRef = useRef(productRedux);
  const isMobileRef = useRef(isMobile);
  const mapAvailSpaceRef = useRef({
    height: mapAvailSpaceHeight,
    width: mapAvailSpaceWidth,
  });

  const mapWrapperRef = useRef({
    height: mapWrapperHeight,
    width: mapWrapperWidth,
  });

  const {
    paddingWidth,
    layoutObj,
    baseLongSize,
  } = getCenteringLayoutDimensions({
    product: productRef.current,
    layout: activeLayoutRedux,
    elWidth: canvasMap?.width,
    elHeight: canvasMap?.height,
  });

  useEffect(() => {
    setDevicePixelRatio(RUNTIME_PIXEL_RATIO);
  }, []);

  useEffect(() => {
    mapTitlesRef.current = mapTitles;
  }, [JSON.stringify(mapTitles)]);

  useEffect(() => {
    layoutRef.current = activeLayoutRedux;
  }, [activeLayoutRedux]);

  useEffect(() => {
    mapCoordinatesRef.current = mapCenterCoordinates;
  }, [mapCenterCoordinates]);

  useEffect(() => {
    productRef.current = productRedux;
  }, [productRedux]);

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  useEffect(() => {
    mapAvailSpaceRef.current = {
      height: mapAvailSpaceHeight,
      width: mapAvailSpaceWidth,
    };
  }, [mapAvailSpaceHeight, mapAvailSpaceWidth]);

  useEffect(() => {
    mapWrapperRef.current = {
      height: mapWrapperHeight,
      width: mapWrapperWidth,
    };
  }, [mapWrapperHeight, mapWrapperWidth]);

  useEffect(() => {
    if (layoutCanvas && canvasMap) {
      resizeLayout({
        cvsLayout: layoutCanvas,
        cvsMap: canvasMap,
        activeLayout: activeLayoutRedux,
        mapTitles: mapTitlesRef.current,
        product: productRef.current,
        activeMapStyleName: activeMapStyleName,
      });

      resizeFrameDiv({
        productRef,
        baseLongSize,
        mapAvailSpaceRef,
      });
    }
  }, [
    activeLayoutRedux,
    JSON.stringify(productRedux),
    isMobile,
    mapAvailSpaceHeight,
    mapAvailSpaceWidth,
    JSON.stringify(mapTitles),
    activeMapStyleName,
  ]);

  useEffect(() => {
    if (mapInstance) {
      const { updHeight, updWidth } = getUpdatedMapSizes({
        ratio: productRef.current.sizeObject.ratio,
        mapWrapWrapHeight: mapAvailSpaceRef.current.height,
        mapWrapWrapWidth: mapAvailSpaceRef.current.width,
      });

      canvasMap = mapInstance.getCanvas();
      ctxMap = canvasMap.getContext("webgl");
      const mapWrapDivElement = document.getElementsByClassName(
        "mapboxgl-map"
      )[0];
      trueMapCanvasElement = document.getElementsByClassName(
        "mapboxgl-canvas"
      )[0];

      const mapCanvasWrapElement = document.getElementsByClassName(
        "mapboxgl-canvas-container"
      )[0];

      mapCanvasWrapElement.style.position = "relative";

      const existingLayoutCanvas = document.getElementById("layout_canvas");
      if (existingLayoutCanvas) {
        existingLayoutCanvas.parentNode.removeChild(existingLayoutCanvas);
      }

      frameDiv = document.createElement("div");
      frameDiv.setAttribute("id", "frame_div");
      inputWrap = document.createElement("div");
      inputWrap.setAttribute("id", "input_wrap");
      // inputWrapDynamicSize = document.createElement("div");
      // inputWrapDynamicSize.setAttribute("id", "input_wrap_middle");

      resizeInputsWrap({ productRef, layout: activeLayoutRedux, canvasMap });

      headlineInput = document.createElement("input");
      subtitleInput = document.createElement("input");

      layoutCanvas = document.createElement("canvas");
      layoutCanvas.setAttribute("id", "layout_canvas");

      resizeLayout({
        cvsLayout: layoutCanvas,
        cvsMap: canvasMap,
        activeLayout: layoutRef.current,
        mapTitles: mapTitlesRef.current,
        product: productRef.current,
        activeMapStyleName,
      });

      resizeInputs({
        mapTitles: mapTitlesRef.current,
        saveTitlesValue,
        mapHeight: updHeight,
        mapWidth: updWidth,
        layout: layoutRef.current,
        layoutObj,
        paddingWidth: paddingWidth / RUNTIME_PIXEL_RATIO,
        activeMapStyleName,
        productRef,
      });

      mapWrapDivElement.appendChild(inputWrap);
      mapCanvasWrapElement.appendChild(layoutCanvas);

      resizeInputsWrap({ productRef, layout: layoutRef.current, canvasMap });

      inputWrap.appendChild(headlineInput);
      inputWrap.appendChild(subtitleInput);

      mapInstance.on("resize", () => {
        resizeLayout({
          cvsLayout: layoutCanvas,
          cvsMap: canvasMap,
          activeLayout: layoutRef.current,
          mapTitles: mapTitlesRef.current,
          product: productRef.current,
          activeMapStyleName,
        });

        resizeFrameDiv({
          productRef,
          baseLongSize,
          mapAvailSpaceRef,
        });

        resizeInputsWrap({ productRef, layout: layoutRef.current, canvasMap });
      });

      mapInstance.on("zoomend", (e) => {
        dispatch(setMapZoomAction(e.target.getZoom()));
      });

      if (mapInstance) {
        mapInstance.resize();
      }
    }

    return () => {
      frameDiv?.remove();
      inputWrap?.remove();
      headlineInput?.remove();
      subtitleInput?.remove();
    };
  }, [mapInstance, activeMapStyleName]);

  useEffect(() => {
    mapWrapper = document.getElementById("map_wrap_id");

    const { updHeight, updWidth } = getUpdatedMapSizes({
      ratio: productRef.current.sizeObject.ratio,
      mapWrapWrapHeight: mapAvailSpaceRef.current.height,
      mapWrapWrapWidth: mapAvailSpaceRef.current.width,
    });

    Object.assign(mapWrapper.style, {
      display: "block",
      height: updHeight ? `${updHeight}px` : 0,
      width: updWidth ? `${updWidth}px` : 0,
      boxShadow: "0px 0px 25px rgba(156, 156, 156, 1)",
    });

    if (mapInstance) {
      mapInstance.resize();
    }
  }, [productRedux, mapInstance, mapAvailSpaceHeight, mapAvailSpaceWidth]);

  useEffect(() => {
    if (headlineInput && subtitleInput) {
      const { updHeight, updWidth } = getUpdatedMapSizes({
        ratio: productRef.current.sizeObject.ratio,
        mapWrapWrapHeight: mapAvailSpaceRef.current.height,
        mapWrapWrapWidth: mapAvailSpaceRef.current.width,
      });

      resizeInputsWrap({ productRef, layout: layoutRef.current, canvasMap });
      resizeInputs({
        mapTitles: mapTitlesRef.current,
        saveTitlesValue,
        mapHeight: updHeight,
        mapWidth: updWidth,
        layout: layoutRef.current,
        layoutObj,
        paddingWidth: paddingWidth / RUNTIME_PIXEL_RATIO,
        activeMapStyleName,
        productRef,
      });
    }
  }, [
    productRedux,
    activeLayoutRedux,
    mapAvailSpaceHeight,
    mapAvailSpaceWidth,
    JSON.stringify(mapTitles),
  ]);

  const saveTitlesValue = (e) => {
    switch (e.target.name) {
      case TITLE_NAMES.TITLE:
        dispatch(setNewTitle(e.target.value ?? ""));
        return;
      case TITLE_NAMES.SUBTITLE:
        dispatch(setNewSubtitle(e.target.value ?? ""));
        return;
      default:
        alert("Wrong input name");
    }
  };

  return (
    <StyledSection
      isMobile={isMobile}
      headerHeight={headerHeight}
      screenHeight={screenHeight}
    >
      <ContainerBox
        headerHeight={isMobile ? 0 : headerHeight}
        isMobile={isMobile}
        screenHeight={screenHeight}
      >
        <CanvasBox>
          <MapContainer
            map={mapInstance}
            snapMapInstance={snapMapInstance}
            addZoom={addZoom(mapInstance)}
            subtractZoom={subtractZoom(mapInstance)}
            mapTitles={mapTitles}
            setMapInstance={setMapInstance}
            setSnapMapInstance={setSnapMapInstance}
          />
        </CanvasBox>

        <SettingsBox>
          <TabsRoot map={mapInstance} snapMapInstance={snapMapInstance} />
        </SettingsBox>
      </ContainerBox>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  margin-top: ${({ headerHeight, isMobile }) =>
    isMobile ? 0 : `${headerHeight}px`};
  height: ${({ headerHeight, screenHeight, isMobile }) =>
    `calc(${screenHeight}px - ${!isMobile ? headerHeight : 0}px)`};
`;

const ContainerBox = styled.div`
  height: ${({ headerHeight, screenHeight, isMobile }) =>
    `calc(${screenHeight}px - ${!isMobile ? headerHeight : 0}px)`};
  overflow: hidden;
  display: block;
  width: 100%;
  background-color: ${color("background_almost_white")};

  ${mobile`
    display: flex;
  `}
`;

const CanvasBox = styled.div`
  // order: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);

  ${mobile`
    order: 1;
    width: 60%;
  `};

  ${desktop`
    width: 70%;
  `}
`;

const SettingsBox = styled.div`
  ${mobile`
    order: 0;
    width: 40%;
    background-color: white;
  `}

  ${desktop`
    width: 30%;
  `}
`;
