/** @jsx jsx */
import React, { useEffect, useState, useRef } from "react";
import { jsx, Container, Box } from "theme-ui";
import SetupColumn from "components/Tabs/TabsRoot";
import MapContainer from "components/canvas/mapContainer";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import styled from "styled-components";
import produce from "immer";

import { useIsMobile } from "../Hooks/useIsMobile";
import { useElementDimensions } from "../Hooks/useElementDimensions";
import { drawLayout } from "../LibGlobal/drawLayout";
import { prepareTextInput } from "../LibGlobal/prepareTextInput";
import { getUpdatedMapSizes } from "../LibGlobal/getUpdatedMapSizes";
import { getCenteringLayoutDimensions } from "../LibGlobal/getCenteringLayoutDimensions";
import { getIsVariantFramed } from "../LibGlobal/getIsVariantFramed";
import { getIsProduction } from "../LibGlobal/getIsProduction";
import { getCurrentPixelRatio } from "../LibGlobal/getCurrentPixelRatio";
import { useGetDataPrintful } from "../Hooks/useGetDataPrintful";
import { getPriceAlgorithm } from "../LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { getSizeOfTitle } from "../LibGlobal/getSizeOfTitle";

import {
  MAP_STYLES,
  MAP_STYLES_NAMES,
  // PIXEL_RATIO,
  LAYOUT_STYLE_NAMES,
  SIZES,
  VARIANTS_PRINTFUL,
  OUTSIDE_FRAME_CM,
  TITLES_DEFAULT,
} from "../constants/constants";

let map;
let layoutCanvas;
let frameDiv;
let inputWrap;
// let inputWrapDynamicSize;
let headlineInput;
let subtitleInput;

let canvasMap;
let ctxMap;
let mapWrapper;
let CURRENT_PIXEL_RATIO;

const IS_PRODUCTION = getIsProduction();
const priceAlgorithm = getPriceAlgorithm();

const resizeLayout = ({
  cvsLayout,
  cvsMap,
  activeLayout,
  product,
  mapTitles,
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
    activeLayout,
    mapTitles: !IS_PRODUCTION && mapTitles,
    product,
  });

  Object.assign(cvsLayout.style, {
    position: "absolute",
    pointerEvents: "none",
    display: "block",
    width: `${cvsMap.width / CURRENT_PIXEL_RATIO}px`,
    height: `${cvsMap.height / CURRENT_PIXEL_RATIO}px`,
  });
};

const resizeFrameDiv = ({ productRef, baseLongSize, mapAvailSpaceRef }) => {
  const framedVariantObj = getIsVariantFramed(productRef.current.variantId);
  let frameWidthKoefficient;

  if (productRef.current.sizeObject.ratio > 1) {
    frameWidthKoefficient =
      OUTSIDE_FRAME_CM / productRef.current.sizeObject.height;
  } else {
    frameWidthKoefficient =
      OUTSIDE_FRAME_CM / productRef.current.sizeObject.width;
  }

  console.log({ frameWidthKoefficient });

  const { updHeight, updWidth } = getUpdatedMapSizes({
    ratio: productRef.current.sizeObject.ratio,
    mapWrapWrapHeight: mapAvailSpaceRef.current.height,
    mapWrapWrapWidth: mapAvailSpaceRef.current.width,
  });

  if (framedVariantObj) {
    const extraFrame =
      (baseLongSize * frameWidthKoefficient) / CURRENT_PIXEL_RATIO;

    console.log({
      extraFrame,
      baseLongSize,
      CURRENT_PIXEL_RATIO,
    });

    Object.assign(frameDiv.style, {
      position: "absolute",
      pointerEvents: "none",
      display: "block",
      boxShadow: "0px 0px 35px rgba(116, 116, 116, 1)",
      // top: `-${extraFrame}px`,
      // left: `-${extraFrame}px`,
      top: 0,
      left: 0,
      outline: `${extraFrame + 0}px solid ${framedVariantObj.frameColor}`,
      width: `${Math.floor(updWidth)}px`,
      height: `${Math.floor(updHeight)}px`,
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
}) => {
  console.log("prepareTextInput: ", { mapTitles });
  prepareTextInput({
    element: headlineInput,
    name: "heading",
    textSize: mapTitles.heading.size,
    textValue: mapTitles.heading.text,
    onInput: saveTitlesValue,
    height: mapHeight,
    width: mapWidth,
    // padding: paddingWidth,
    // textAlign,
    layout,
  });
  prepareTextInput({
    element: subtitleInput,
    name: "subtitle",
    textSize: mapTitles.subtitle.size,
    textValue: mapTitles.subtitle.text,
    // color: "grey",
    onInput: saveTitlesValue,
    height: mapHeight,
    width: mapWidth,
    // padding: paddingWidth,
    // textAlign,
    layout,
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
    height: bottomBannerHeight + "px", // `${frameCanvas.height}px`,
    marginBottom: paddingWidth + "px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  });

  // Object.assign(inputWrapDynamicSize.style, {
  //   width: "auto",
  //   height: "100%",
  //   minWidth: "50px",
  //   padding: "0px 5px",
  //   display: "flex",
  //   justifyContent: "center",
  //   flexDirection: "column",
  //   alignItems: "stretch",
  //   backgroundColor: "rgba(0,0,0,0.1)",
  //   // justifyContent: "center",
  //   // position: "absolute",
  //   // bottom: 0,
  // });
};

export default function RootContainer() {
  const [mapCoordinates, setMapCoordinates] = useState([
    -73.985542,
    40.7484665,
  ]);
  const [mapZoom, setMapZoom] = useState(10);
  const { dataPrintful } = useGetDataPrintful();

  const [product, setProduct] = useState({
    name: "Zakázková mapa dle vlastního designu",
    price: null,
    currency: "CZK",
    sizeObject: SIZES.find(
      (size) => size.code === VARIANTS_PRINTFUL[4].sizeName
    ),
    variantId: VARIANTS_PRINTFUL[4].id,
    materialDesc: "Matný vylepšený papír",
    shippingCode: VARIANTS_PRINTFUL[4].shipping.codeCZ,
  });

  const [layout, setLayout] = useState(LAYOUT_STYLE_NAMES.ISLAND_BOX);
  const [activeMapStyle, setActiveMapStyle] = useState(
    MAP_STYLES_NAMES.WHITE_GREY
  );
  const [mapTitles, setMapTitles] = useState({
    heading: { text: TITLES_DEFAULT[0], size: 14 },
    subtitle: { text: TITLES_DEFAULT[1], size: 8 },
  });

  const { height: headerHeight } = useElementDimensions("header");
  const {
    height: mapAvailSpaceHeight,
    width: mapAvailSpaceWidth,
  } = useElementDimensions("map_available_space_id");

  const {
    height: mapWrapperHeight,
    width: mapWrapperWidth,
  } = useElementDimensions("map_wrapper_id");

  CURRENT_PIXEL_RATIO = getCurrentPixelRatio(product.variantId);
  const { isMobile } = useIsMobile();

  const mapTitlesRef = useRef(mapTitles); // Using this due to snapshot state of state in hooks
  const layoutRef = useRef(layout);
  const coordinatesRef = useRef(mapCoordinates);
  const productRef = useRef(product);
  const isMobileRef = useRef(isMobile);
  const mapAvailSpaceRef = useRef({
    height: mapAvailSpaceHeight,
    width: mapAvailSpaceWidth,
  });

  const mapWrapperRef = useRef({
    height: mapWrapperHeight,
    width: mapWrapperWidth,
  });

  console.log({ mapWrapperWidth, mapWrapperHeight });

  const {
    paddingWidth,
    // bottomBannerHeight,
    layoutObj,
    baseLongSize,
  } = getCenteringLayoutDimensions({
    product: productRef.current,
    //     variantId: productRef.current.variantId,
    layout,
    elWidth: canvasMap?.width,
    elHeight: canvasMap?.height,
  });

  useEffect(() => {
    Object.defineProperty(window, "devicePixelRatio", {
      get: function () {
        return CURRENT_PIXEL_RATIO; // x / 96;
      },
    });

    // const getAndSetPrice = async () => {
    //   const response = await axios.post(`api/data-printful`, {
    //     variantIdsArr: [product.variantId],
    //   });

    //   setProduct((prev) => ({
    //     ...prev,
    //     price: response.data.finalResult[product.variantId].price,
    //   }));
    // };

    // getAndSetPrice();
  }, []);

  useEffect(() => {
    if (dataPrintful && dataPrintful[product.variantId]?.price) {
      setProduct((prev) => ({
        ...prev,
        // price: response.data.finalResult[product.variantId].price,
        priceWithDelivery: priceAlgorithm.getPriceWithDelivery(
          product.variantId,
          dataPrintful
        ).netPrice,
      }));
    }

    getSizeOfTitle(mapTitles.heading.text);
  }, [mapTitles]);

  useEffect(() => {
    mapTitlesRef.current = mapTitles;
  }, [mapTitles]);

  useEffect(() => {
    layoutRef.current = layout;
  }, [layout]);

  useEffect(() => {
    coordinatesRef.current = mapCoordinates;
  }, [mapCoordinates]);

  useEffect(() => {
    productRef.current = product;
  }, [product]);

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
    layoutRef.current = layout;

    if (layoutCanvas && canvasMap) {
      resizeLayout({
        cvsLayout: layoutCanvas,
        cvsMap: canvasMap,
        activeLayout: layout,
        mapTitles: mapTitlesRef.current,
        product: productRef.current,
      });

      resizeFrameDiv({
        productRef,
        baseLongSize,
        mapAvailSpaceRef,
      });
    }
  }, [layout, product, isMobile, mapAvailSpaceHeight, mapAvailSpaceWidth]);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGV0cmhvc2tvdmVjIiwiYSI6ImNrbHY2ZXY5eDJuaGkyb24xMXpzOHY2cXAifQ.g7wKRkK7WFwczUmDOYwCtQ";

    map = new mapboxgl.Map({
      container: "map",
      zoom: mapZoom,
      minZoom: 0,
      center: coordinatesRef.current,
      style: MAP_STYLES[activeMapStyle],
      preserveDrawingBuffer: true,
    });

    return () => {
      map.remove();
    };
  }, [activeMapStyle]);

  useEffect(() => {
    if (map) {
      const { updHeight, updWidth } = getUpdatedMapSizes({
        ratio: productRef.current.sizeObject.ratio,
        mapWrapWrapHeight: mapAvailSpaceRef.current.height,
        mapWrapWrapWidth: mapAvailSpaceRef.current.width,
      });

      canvasMap = map.getCanvas();
      ctxMap = canvasMap.getContext("webgl");
      const mapElement = document.getElementById("map");

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

      resizeInputsWrap({ productRef, layout, canvasMap });

      headlineInput = document.createElement("input");
      subtitleInput = document.createElement("input");

      // headlineInput.innerText = TITLES_DEFAULT[0];
      // subtitleInput.innerText = TITLES_DEFAULT[1];

      map.on("moveend", function () {
        setMapCoordinates(map.getCenter());
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
        });

        resizeInputs({
          mapTitles: mapTitlesRef.current,
          saveTitlesValue,
          mapHeight: updHeight,
          mapWidth: updWidth,
          layout: layoutRef.current,
          layoutObj,
          paddingWidth,
        });

        mapElement.appendChild(frameDiv);
        mapElement.appendChild(layoutCanvas);
        mapElement.appendChild(inputWrap);

        resizeInputsWrap({ productRef, layout, canvasMap });
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
        });

        resizeFrameDiv({
          productRef,
          baseLongSize,
          mapAvailSpaceRef,
        });
      });

      map.on("zoomend", (e) => {
        setMapZoom(e.target.getZoom());
      });

      if (map) {
        map.resize();
      }
    }

    return () => {
      frameDiv.remove();
      inputWrap.remove();
      headlineInput.remove();
      subtitleInput.remove();
    };
  }, [map, activeMapStyle]);

  useEffect(() => {
    mapWrapper = document.getElementById("map_wrapper_id");

    const { updHeight, updWidth } = getUpdatedMapSizes({
      ratio: productRef.current.sizeObject.ratio,
      mapWrapWrapHeight: mapAvailSpaceRef.current.height,
      mapWrapWrapWidth: mapAvailSpaceRef.current.width,
    });

    Object.assign(mapWrapper.style, {
      height: `${updHeight}px`,
      width: `${updWidth}px`,
      boxShadow: "0px 0px 25px rgba(156, 156, 156, 1)",
    });

    // const mapPlayground = document.getElementById("map_playground_wrap");

    // Object.assign(mapPlayground.style, {
    //   height: `${(updHeight * 1, 5)}px`,
    // });

    if (map) {
      map.resize();
    }
  }, [product, map, mapAvailSpaceHeight, mapAvailSpaceWidth]);

  useEffect(() => {
    if (headlineInput && subtitleInput) {
      const { updHeight, updWidth } = getUpdatedMapSizes({
        ratio: productRef.current.sizeObject.ratio,
        mapWrapWrapHeight: mapAvailSpaceRef.current.height,
        mapWrapWrapWidth: mapAvailSpaceRef.current.width,
      });

      resizeInputsWrap({ productRef, layout, canvasMap });

      resizeInputs({
        mapTitles: mapTitlesRef.current,
        saveTitlesValue,
        mapHeight: updHeight,
        mapWidth: updWidth,
        layout,
        layoutObj,
        paddingWidth,
      });
    }
  }, [product, layout, mapAvailSpaceHeight, mapAvailSpaceWidth]);

  const saveTitlesValue = (e) => {
    // console.log("New Value: ", headlineInput.innerText);
    setMapTitles((prev) =>
      produce(prev, (draftState) => {
        const newValue = e.target.value ?? ""; // ?.toUpperCase()
        draftState[e.target.name].text = newValue;
        // draftState.heading.text = headlineInput.innerText;
        // draftState.subtitle.text = subtitleInput.innerText;
      })
    );
  };

  return (
    <section sx={{ marginTop: headerHeight }}>
      <ContainerBox headerHeight={headerHeight}>
        <div sx={styles.containerBox}>
          <Box sx={styles.canvasBox} id="map_playground_wrap">
            <MapContainer
              addZoom={addZoom(map)}
              subtractZoom={subtractZoom(map)}
              setProduct={setProduct}
              product={product}
            />
          </Box>
          <Box sx={styles.settingsBox}>
            <SetupColumn
              map={map}
              activeFrame={layout}
              setActiveLayout={setLayout}
              activeMapStyle={activeMapStyle}
              setActiveMapStyle={setActiveMapStyle}
              mapCoordinates={mapCoordinates}
              setMapCoordinates={setMapCoordinates}
              mapTitles={mapTitles}
              product={product}
              setProduct={setProduct}
            />
          </Box>
        </div>
      </ContainerBox>
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
  canvasBox: {
    // px: [0, null, "40px", 0],
    order: [0, 0, 0, 2],
    width: ["100%", "100%", "100%", "60%"],
    height: [null, null, null, "100%"],
  },
  settingsBox: {
    flexShrink: 1,
    order: [1, 1, 1, 0],
    px: [0, null, "30px", 0],
    textAlign: ["center", null, "right", "left"],
    width: ["100%", "100%", "100%", "40%"],
    mx: "auto",
    backgroundColor: "background_secondary",
    pb: ["30px", null, null, 0],
    ".description": {
      pr: [0, null, null, null, 4],
    },
    height: "100%",
  },
};

const ContainerBox = styled.div`
  height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};
`;
