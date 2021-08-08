/** @jsx jsx */
import React, { useEffect, useState, useRef } from "react";
import { render } from "react-dom";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Lightbox from "react-image-lightbox";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Rotate90DegreesCcwIcon from "@material-ui/icons/Rotate90DegreesCcw";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import dynamic from "next/dynamic";
import ExploreOffIcon from "@material-ui/icons/ExploreOff";

import { getFlippedSizeObject } from "LibGlobal/getFlippedSizeObject";
import { useIsMobile } from "Hooks/useIsMobile";
import { color, fontWeight } from "utils";
import Logo from "components/logo";
import LogoWhite from "assets/logo_while.png";
import { useQualityImageCreator } from "Hooks/useQualityImageCreator";
import { setProductAction } from "redux/order/actions";
import { getPriceAlgorithm } from "LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";

import {
  useProductSelector,
  useActiveLayoutSelector,
  useActiveMapStyleSelector,
  useIsKonvaRenderedSelector,
} from "redux/order/reducer";

import {
  FAKE_DIV_IDS,
  TITLES_DEFAULT,
  VARIANTS_PRINTFUL,
  RUNTIME_PIXEL_RATIO,
  ORIENTATIONS,
  PRINT_CANVAS_BASE_PX,
} from "constants/constants";

const getFormatedPriceString = (amount) => {
  return amount ? `| ${getFormattedPrice(amount)}` : "";
};

const KonvaStage = dynamic(() => import("components/KonvaStage"), {
  ssr: false,
});

export default function MapContainer({
  map,
  addZoom,
  subtractZoom,
  mapTitles,
  konvaStageRef,
}) {
  const dispatch = useDispatch();
  const productRedux = useProductSelector();
  const activeLayoutNameRedux = useActiveLayoutSelector();
  const activeMapStyleName = useActiveMapStyleSelector();
  const isKonvaRendered = useIsKonvaRenderedSelector();

  const [lightbox, setLightbox] = useState({
    open: false,
    activeSrc: null,
  });

  const [isCreatingImage, setIsCreatingImage] = useState(false);
  const { isMobile } = useIsMobile();
  const qualityImageCreator = useQualityImageCreator();
  const priceAlgorithm = getPriceAlgorithm();

  const { dataPrintful } = useGetDataPrintful(
    VARIANTS_PRINTFUL.map((variant) => variant.id)
  );

  const priceWithDelivery = priceAlgorithm.getPriceWithDelivery(
    productRedux.variantId,
    dataPrintful
  );

  const changeOrientation = () => {
    dispatch(
      setProductAction({
        sizeObject: getFlippedSizeObject(productRedux),
      })
    );
  };

  const fullscreenImageRequested = async () => {
    setIsCreatingImage(true);

    const finalImgSrc = await qualityImageCreator({
      map,
      activeLayoutName: activeLayoutNameRedux,
      product: productRedux,
      activeMapStyleName,
      mapTitles,
      konvaRef: konvaStageRef,
      options: {
        isPreview: false,
        isLowDefinition: false,
      },
    });

    setLightbox({
      open: true,
      activeSrc: finalImgSrc,
    });

    setIsCreatingImage(false);
  };

  const canvasMap = map?.getCanvas();

  return (
    <div sx={styles.canvas_bg} id="map_studio_segment">
      <div sx={styles.allBtnWrapper} id="map_buttons_wrapper">
        {isMobile && (
          <LogoWrap>
            <Logo src={LogoWhite} />
          </LogoWrap>
        )}
        {!isMobile && (
          <StyledP size="small">
            cena {getFormatedPriceString(priceWithDelivery.netPrice)}
          </StyledP>
        )}

        <EmptySpaceExpander></EmptySpaceExpander>
        <div sx={styles.zoomBtnWrapper}>
          <div sx={styles.zoomBtn} className="left" onClick={addZoom}>
            <AddIcon />
          </div>
          <div sx={styles.zoomBtn} className="right" onClick={subtractZoom}>
            <RemoveIcon />
          </div>
        </div>

        <div sx={styles.rotateBtn}>
          <Rotate90DegreesCcwIcon onClick={changeOrientation} />
        </div>

        <div
          sx={styles.rotateBtn}
          onClick={() => !isCreatingImage && fullscreenImageRequested()}
        >
          {isCreatingImage ? (
            <ColorWrap>
              <StyledCircularProgress />
            </ColorWrap>
          ) : (
            <OpenWithIcon color="grey" />
          )}
        </div>
      </div>

      <div sx={styles.map_available_space} id="map_available_space_id">
        <div id="map_wrap_2_id" sx={styles.map_wrap_2}>
          {isKonvaRendered && (
            <DescContainer>
              <FrozenMapDesc>
                Pohybování mapou zmraženo <StyledExploreOffIcon />
              </FrozenMapDesc>
            </DescContainer>
          )}
          {isKonvaRendered && canvasMap && (
            <KonvaWrap>
              <KonvaStage
                product={productRedux}
                width={canvasMap.width}
                height={canvasMap.height}
              />
            </KonvaWrap>
          )}
          <div id="map" sx={styles.map_wrap_1}></div>
        </div>

        {Object.keys(FAKE_DIV_IDS).map((key, index) => (
          <div
            id={FAKE_DIV_IDS[key]}
            contenteditable="plaintext-only"
            style={{
              width: "auto",
              display: "inline-block",
              visibility: "hidden",
              position: "fixed",
              overflow: "auto",
              "white-space": "nowrap",
            }}
          >
            {TITLES_DEFAULT[index]}
          </div>
        ))}
      </div>

      <canvas id="canvas_merging" sx={styles.canvas_merging} />
      <PlaceToHideBigMap id="place_to_hide_big_map">
        {isKonvaRendered && canvasMap && (
          <KonvaStage
            product={productRedux}
            width={canvasMap.width}
            height={canvasMap.height}
            forwardedRef={konvaStageRef}
            isPrint={true}
          />
        )}
      </PlaceToHideBigMap>
      {lightbox.open && (
        <Lightbox
          mainSrc={lightbox.activeSrc}
          onCloseRequest={() => setLightbox({ open: false })}
        />
      )}
    </div>
  );
}

const BNT_RADIUS = 4;

const LogoWrap = styled.div`
  position: absolute;
  display: flex;
`;

const EmptySpaceExpander = styled.div`
  flex-grow: 4;
`;

const PlaceToHideBigMap = styled.div`
  width: 0px;
  height: 0px;
  overflow: hidden;
`;

const ColorWrap = styled.div`
  color: ${color("cta_color")} !important;
  display: flex;
`;

const KonvaWrap = styled.div`
  position: relative;
  top: 0px;
  height: ${({ height }) => (height ? `${height}px` : 0)};
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  z-index: 100;
`;

const DescContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 0;
  position: relative;
  top: -55px;
`;

const FrozenMapDesc = styled.p`
  margin: 0;
  height: 40px;
  line-height: 30px;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
`;

const StyledCircularProgress = styled(CircularProgress)`
  height: 24px !important;
  width: 24px !important;
  color: inherit !important;
`;

const StyledExploreOffIcon = styled(ExploreOffIcon)`
  height: 24px !important;
  width: 24px !important;
  color: inherit !important;
  margin-left 5px;: 
`;

const StyledP = styled.p`
  color: ${color("cta_color")};
  font-weight: ${fontWeight("bold")};
  padding-left: 15px;
  margin: 0;
`;

const styles = {
  canvas_bg: {
    px: "0 !important",
    display: "flex",
    flexDirection: "column",
    transform: "translateX(0)", // this is important, reset absolute position to thos element
    height: [null, null, null, "100%"],
    overflow: "auto",
  },
  map_available_space: {
    display: "flex",
    justifyContent: "center",
    alignItems: ["flex-start", null, null, "center"],
    pt: ["20px", null, null, 0],
    width: "100%",
    height: ["60vh", null, null, "85vh"],
  },

  map_wrap_1: {
    position: "relative",
    overflow: "initial",
    width: "100%",
    height: "100%",
  },

  map_wrap_2: {},
  canvas_merging: {
    display: "none",
  },
  allBtnWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px",
  },
  zoomBtnWrapper: {
    display: "flex",
    padding: "auto",
    // marginRight: "30px",
  },
  zoomBtn: {
    border: "1px solid lightGrey",
    display: "flex",
    padding: "5px 5px",
    margin: "auto",
    backgroundColor: "white",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    cursor: "pointer",

    "&.left": {
      borderRadius: `${BNT_RADIUS}px 0 0 ${BNT_RADIUS}px`,
      borderRight: "0px solid lightGrey",
    },
    "&.right": {
      borderRadius: `0 ${BNT_RADIUS}px ${BNT_RADIUS}px 0`,
    },
  },
  rotateBtn: {
    border: "1px solid lightGrey",
    display: "flex",
    padding: "5px 5px",
    m: "2px",
    borderRadius: `${BNT_RADIUS}px`,
    backgroundColor: "white",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    cursor: "pointer",
    // marginRight: "30px",
  },
};
