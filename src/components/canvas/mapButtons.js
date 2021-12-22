/** @jsx jsx */
import React, { useEffect, useState } from "react";
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
import Popper from "@material-ui/core/Popper";

import { getFlippedSizeObject } from "LibGlobal/getFlippedSizeObject";
import { useIsMobile } from "Hooks/useIsMobile";
import { color, fontWeight, fontSize } from "utils";
import Logo from "components/logo";
import BackdropLoader from "components/backdropLoader";
import LogoWhite from "assets/logo_while.png";
import { useQualityImageCreator } from "Hooks/useQualityImageCreator";
import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";

import { setProductAction, setPopupSeenAction } from "redux/order/actions";

import {
  useProductSelector,
  useActiveLayoutSelector,
  useActiveMapStyleSelector,
  useSeenPopupSelector,
} from "redux/order/reducer";

import { VARIANTS_PRINTFUL } from "constants/constants";

const getFormatedPriceString = (amount) => {
  return amount ? `| ${getFormattedPrice(amount)}` : "";
};

export default function MapContainer({
  map,
  snapMapInstance,
  addZoom,
  subtractZoom,
  mapTitles,
}) {
  const dispatch = useDispatch();
  const productRedux = useProductSelector();
  const activeLayoutNameRedux = useActiveLayoutSelector();
  const activeMapStyleName = useActiveMapStyleSelector();
  const seenPopup = useSeenPopupSelector();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const [isCreatingImage, setIsCreatingImage] = useState(false);
  const [lightbox, setLightbox] = useState({
    open: false,
    activeSrc: null,
  });

  const { isMobile } = useIsMobile();
  const qualityImageCreator = useQualityImageCreator();

  const { dataPrintful } = useGetDataPrintful(
    VARIANTS_PRINTFUL.map((variant) => variant.id)
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    openTeaserImage();
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    localStorage.setItem("seenPopup", true);
    dispatch(setPopupSeenAction(true));
    e.stopPropagation();
  };

  const isPopupOpen = Boolean(anchorEl) && map;
  const id = isPopupOpen ? "simple-popper" : undefined;

  const priceWithDelivery =
    dataPrintful?.[productRedux.variantId]?.priceWithDeliveryAndProfit
      .netPrice ?? 0;

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
      snapMapInstance,
      activeLayoutName: activeLayoutNameRedux,
      product: productRedux,
      activeMapStyleName,
      mapTitles,
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
    return;
  };

  const openTeaserImage = async () => {
    if (isCreatingImage) {
      return;
    }
    setOpenBackdrop(true);
    await fullscreenImageRequested();
    setOpenBackdrop(false);
  };

  useEffect(() => {
    setAnchorEl(
      !seenPopup ? document.getElementById("full_screen_button") : null
    );
  }, []);

  return (
    <>
      <AllBtnWrapper id="map_buttons_wrapper">
        {isMobile && (
          <LogoWrap>
            <Logo src={LogoWhite} />
          </LogoWrap>
        )}
        {!isMobile && (
          <StyledText size="small">
            {`cena 
            ${getFormatedPriceString(priceWithDelivery)}`}
          </StyledText>
        )}

        <EmptySpaceExpander></EmptySpaceExpander>

        <ZoomBtnWrapper>
          <ZoomBtn isLeft={true} onClick={addZoom}>
            <AddIcon />
          </ZoomBtn>
          <ZoomBtn isLeft={false} onClick={subtractZoom}>
            <RemoveIcon />
          </ZoomBtn>
        </ZoomBtnWrapper>

        <RotateBtn>
          <StyledRotateIcon onClick={changeOrientation} />
        </RotateBtn>

        {/* <TeaserButton
          aria-describedby={id}
          id="full_screen_button"
          onClick={handleClick}
        >
          {isCreatingImage ? (
            <ColorWrap>
              <StyledCircularProgress />
            </ColorWrap>
          ) : (
            <OpenWithIcon />
          )}
        </TeaserButton> */}
      </AllBtnWrapper>

      {lightbox.open && (
        <Lightbox
          mainSrc={lightbox.activeSrc}
          onCloseRequest={() => setLightbox({ open: false })}
        />
      )}

      {openBackdrop && <BackdropLoader defaultState={true} />}
    </>
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

const ColorWrap = styled.div`
  color: ${color("cta_color")} !important;
  display: flex;
`;

const StyledImg = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
`;

const StyledRotateIcon = styled(Rotate90DegreesCcwIcon)`
  transform: rotate(-45deg);
`;

const StyledCircularProgress = styled(CircularProgress)`
  height: 24px !important;
  width: 24px !important;
  color: inherit !important;
`;

const StyledText = styled.p`
  color: ${color("primary")};
  font-weight: ${fontWeight("bold")};
  padding-left: 15px;
  margin: 0;
`;

const TooltipBodyWrap = styled.div`
  width: 300px;
  margin-top: 2px;
  background-color: rgba(220, 0, 78, 0.99);
  color: white;
  display: flex;

  padding: 5px;
  flex-direction: column;

  & p {
    font-size: ${fontSize("sm")};
  }
`;

const DummyBtn = styled.div`
  border: 1px solid lightGrey;
  display: inline-flex;
  padding: 3px;
  margin: 2px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  color: rgba(0, 0, 0, 0.8);
`;

const ImagesWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TeaserButton = styled.div`
  border: 1px solid grey;
  display: flex;
  padding: 5px 5px;
  m: 2px;
  border-radius: ${BNT_RADIUS}px;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  cursor: pointer;
`;

const ZoomBtn = styled.div`
  border: 1px solid grey;
  display: flex;
  padding: 5px 5px;
  margin: auto;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  border-radius: ${({ isLeft }) =>
    isLeft
      ? `${BNT_RADIUS}px 0 0 ${BNT_RADIUS}px`
      : `0 ${BNT_RADIUS}px ${BNT_RADIUS}px 0`};
  border-right: ${({ isLeft }) => isLeft && "0px solid lightGrey"};
`;

const RotateBtn = styled.div`
  border: 1px solid grey;
  display: flex;
  padding: 5px 5px;
  m: 2px;
  border-radius: ${BNT_RADIUS}px;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  cursor: pointer;
`;

const AllBtnWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

const ZoomBtnWrapper = styled.div`
  display: flex;
  padding: auto;
  margin-right: 20px;
`;
