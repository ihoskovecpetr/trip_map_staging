/** @jsx jsx */
import React, { useEffect, useRef } from "react";
import { jsx, Box } from "theme-ui";
import TabsRootNew from "components/Tabs/TabsRoot";
import MapContainer from "components/canvas/mapContainer";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";
// import produce from "immer";
import { useDispatch } from "react-redux";

import { useIsMobile } from "../Hooks/useIsMobile";
import { useElementDimensions } from "Hooks/useElementDimensions";
import { drawLayout } from "../LibGlobal/drawLayout";
import { prepareTextInput } from "../LibGlobal/prepareTextInput";
import { getUpdatedMapSizes } from "../LibGlobal/getUpdatedMapSizes";
import { getCenteringLayoutDimensions } from "../LibGlobal/getCenteringLayoutDimensions";
import { getVariantObject } from "../LibGlobal/getVariantObject";
import { getIsProduction } from "../LibGlobal/getIsProduction";
import { getCurrentPixelRatio } from "../LibGlobal/getCurrentPixelRatio";
// import { useGetDataPrintful } from "../Hooks/useGetDataPrintful";
// import { getPriceAlgorithm } from "../LibGlobal/priceAlgorithm/getPriceAlgorithm";
// import { getSizeOfTitle } from "../LibGlobal/getSizeOfTitle";
import { getLayoutColors } from "LibGlobal/getLayoutColors";
import { setDevicePixelRatio } from "LibGlobal/setDevicePixelRatio";

import {
  useTitlesSelector,
  useProductSelector,
  useActiveLayoutSelector,
  useMapCoordinatesSelector,
  useMapZoomSelector,
  useActiveMapStyleSelector,
} from "redux/order/reducer";

import {
  setNewTitle,
  setNewSubtitle,
  setMapCoordinatesAction,
  setMapZoomAction,
  setActiveMapStyleAction,
} from "redux/order/actions";

import {
  MAP_STYLES,
  // MAP_STYLES_NAMES,
  // LAYOUT_STYLE_NAMES,
  // SIZES,
  // VARIANTS_PRINTFUL,
  OUTSIDE_FRAME_CM,
  // TITLES_DEFAULT,
  DEFAULT_FONT_WEIGHT_THIN,
  RUNTIME_PIXEL_RATIO,
  TITLE_NAMES,
} from "../constants/constants";

// const mapStyles = require.context("assets/MAPS_MAPBOX", true);

let map;
let trueMapCanvasElement;
let layoutCanvas;
// let frameDiv;
let inputWrap;
let headlineInput;
let subtitleInput;

let canvasMap;
let ctxMap;
let mapWrapper;

const IS_PRODUCTION = getIsProduction();
// const priceAlgorithm = getPriceAlgorithm();

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
      outline: `${extraFrame + 0}px solid ${variantObj.frameColor}`,
    });
  }
};

const addZoom = (map) => () => {
  map.flyTo({ zoom: map.getZoom() + 1 });
};

const subtractZoom = (map) => () => {
  map.flyTo({ zoom: map.getZoom() - 1 });
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
  const mapCoordinates = useMapCoordinatesSelector();
  const mapZoom = useMapZoomSelector();
  const activeMapStyleName = useActiveMapStyleSelector();
  const konvaStageRef = useRef(null);

  // const { dataPrintful } = useGetDataPrintful();

  // const [activeMapStyleName, setActiveMapStyleName] = useState(
  //   MAP_STYLES_NAMES.RED_BLUE
  // );

  const { height: headerHeight } = useElementDimensions("header");
  const {
    height: mapAvailSpaceHeight,
    width: mapAvailSpaceWidth,
  } = useElementDimensions("map_available_space_id");

  const {
    height: mapWrapperHeight,
    width: mapWrapperWidth,
  } = useElementDimensions("map_wrap_2_id");

  const { isMobile } = useIsMobile();

  const mapTitlesRef = useRef(mapTitles); // Using this due to snapshot state of state in hooks
  const layoutRef = useRef(activeLayoutRedux);
  const mapCoordinatesRef = useRef(mapCoordinates);
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

  // useEffect(() => {
  //   if (dataPrintful && dataPrintful[product.variantId]?.price) {
  //     setProduct((prev) => ({
  //       ...prev,
  //       // price: response.data.finalResult[product.variantId].price,
  //       priceWithDelivery: priceAlgorithm.getPriceWithDelivery(
  //         product.variantId,
  //         dataPrintful
  //       ).netPrice,
  //     }));

  //   }
  // }, [JSON.stringify(mapTitles)]);

  useEffect(() => {
    mapTitlesRef.current = mapTitles;
  }, [JSON.stringify(mapTitles)]);

  useEffect(() => {
    layoutRef.current = activeLayoutRedux;
  }, [activeLayoutRedux]);

  useEffect(() => {
    mapCoordinatesRef.current = mapCoordinates;
  }, [mapCoordinates]);

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
        mapAvailSpaceRef,
      });
    }
  }, [
    activeLayoutRedux,
    JSON.stringify(productRedux),
    isMobile,
    mapAvailSpaceHeight,
    mapAvailSpaceWidth,
    // mapTitles,
    JSON.stringify(mapTitles),
    activeMapStyleName,
  ]);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN;

    map = new mapboxgl.Map({
      container: "map",
      zoom: mapZoom,
      minZoom: 0,
      center: mapCoordinatesRef.current,
      style: MAP_STYLES[activeMapStyleName].url,
      // style: "mapbox://styles/petrhoskovec/ckmzz4z6y0mgx17s4lw0zeyho", // Continue add maps WhiteGreyMap

      preserveDrawingBuffer: true, // to enable method toDataURL()
      // attributionControl: false,
    });

    map.touchPitch.disable();
    map.touchZoomRotate.disableRotation();
    map.dragRotate.disable();

    return () => {
      map.remove();
    };
  }, [activeMapStyleName]);

  useEffect(() => {
    if (map) {
      const { updHeight, updWidth } = getUpdatedMapSizes({
        ratio: productRef.current.sizeObject.ratio,
        mapWrapWrapHeight: mapAvailSpaceRef.current.height,
        mapWrapWrapWidth: mapAvailSpaceRef.current.width,
      });

      canvasMap = map.getCanvas();
      ctxMap = canvasMap.getContext("webgl");
      const mapWrapDivElement = document.getElementById("map");
      trueMapCanvasElement = document.getElementsByClassName(
        "mapboxgl-canvas"
      )[0];

      console.log({ trueMapCanvasElement });

      const mapCanvasWrapElement = document.getElementsByClassName(
        "mapboxgl-canvas-container"
      )[0];
      mapCanvasWrapElement.style.position = "relative";

      const existingLayoutCanvas = document.getElementById("layout_canvas");
      if (existingLayoutCanvas) {
        existingLayoutCanvas.parentNode.removeChild(existingLayoutCanvas);
      }

      // frameDiv = document.createElement("div");
      // frameDiv.setAttribute("id", "frame_div");
      inputWrap = document.createElement("div");
      inputWrap.setAttribute("id", "input_wrap");
      // inputWrapDynamicSize = document.createElement("div");
      // inputWrapDynamicSize.setAttribute("id", "input_wrap_middle");

      resizeInputsWrap({ productRef, layout: activeLayoutRedux, canvasMap });

      headlineInput = document.createElement("input");
      subtitleInput = document.createElement("input");

      // headlineInput.innerText = TITLES_DEFAULT[0];
      // subtitleInput.innerText = TITLES_DEFAULT[1];

      map.on("moveend", function () {
        dispatch(setMapCoordinatesAction(map.getCenter()));
        // setMapCoordinates(map.getCenter());
      });

      layoutCanvas = document.createElement("canvas");
      layoutCanvas.setAttribute("id", "layout_canvas");

      map.on("load", function () {
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

        const konvaWrap = document.createElement("div");
        konvaWrap.setAttribute("id", "konva_wrap");

        mapWrapDivElement.appendChild(inputWrap);
        // mapCanvasWrapElement.appendChild(frameDiv);
        mapCanvasWrapElement.appendChild(layoutCanvas);
        mapCanvasWrapElement.appendChild(konvaWrap);

        resizeInputsWrap({ productRef, layout: layoutRef.current, canvasMap });
        // inputWrap.appendChild(inputWrapDynamicSize);

        inputWrap.appendChild(headlineInput);
        inputWrap.appendChild(subtitleInput);
      });

      map.on("resize", () => {
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
          mapAvailSpaceRef,
        });
      });

      map.on("zoomend", (e) => {
        dispatch(setMapZoomAction(e.target.getZoom()));
      });

      if (map) {
        map.resize();
      }
    }

    return () => {
      // frameDiv.remove();
      inputWrap.remove();
      headlineInput.remove();
      subtitleInput.remove();
    };
  }, [map, activeMapStyleName]);

  useEffect(() => {
    mapWrapper = document.getElementById("map_wrap_2_id");

    const { updHeight, updWidth } = getUpdatedMapSizes({
      ratio: productRef.current.sizeObject.ratio,
      mapWrapWrapHeight: mapAvailSpaceRef.current.height,
      mapWrapWrapWidth: mapAvailSpaceRef.current.width,
    });

    Object.assign(mapWrapper.style, {
      height: updHeight ? `${updHeight}px` : 0,
      width: updWidth ? `${updWidth}px` : 0,
      boxShadow: "0px 0px 25px rgba(156, 156, 156, 1)",
    });

    if (map) {
      map.resize();
    }
  }, [productRedux, map, mapAvailSpaceHeight, mapAvailSpaceWidth]);

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
    console.log("saveTitlesValue_call_val: ", e.target.value);
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
    <section sx={{ marginTop: isMobile ? 0 : headerHeight }}>
      <ContainerBox headerHeight={isMobile ? 0 : headerHeight}>
        <div sx={styles.containerBox}>
          <Box sx={styles.canvasBox}>
            <MapContainer
              map={map}
              addZoom={addZoom(map)}
              subtractZoom={subtractZoom(map)}
              mapTitles={mapTitles}
              konvaStageRef={konvaStageRef}
            />
          </Box>

          <Box sx={styles.settingsBox}>
            <TabsRootNew map={map} konvaStageRef={konvaStageRef} />
          </Box>
        </div>
      </ContainerBox>
    </section>
  );
}

const styles = {
  containerBox: {
    display: "flex",
    // alignItems: ["flex-start", null, null, "center"],
    justifyContent: "space-between",
    flexDirection: ["column", null, null, "row"],
    alignItems: "flex-start",
    flexWrap: [null, null, null, "wrap"],
    height: "100%",
    width: "100%",
  },

  settingsBox: {
    flexShrink: 1,
    order: [1, 1, 1, 1, 0],
    textAlign: ["center", null, "right", "left"],
    width: ["100%", "100%", "100%", "40%", "30%"],
    mx: "auto",
    backgroundColor: ["white", "white", "white", "background_almost_white"],
    zIndex: 10,
    // position: "relative",

    ".description": {
      pr: [0, null, null, null, 4],
    },
  },
  canvasBox: {
    // px: [0, null, "40px", 0],
    order: [0, 0, 0, 2],
    width: ["100%", "100%", "100%", "60%", "70%"],
    height: [null, null, null, "100%"],
    backgroundColor: "muted",
  },
};

const ContainerBox = styled.div`
  height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};
`;
