import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CheckoutCta from "../Checkout/CheckoutCta";
import { color, mobile } from "utils";
import { createFinalImage } from "LibGlobal/createFinalImage";
import { useQualityImageCreator } from "Hooks/useQualityImageCreator";
import Lightbox from "react-image-lightbox";

import { ORIENTATIONS } from "constants/constants";

export default function Step7MapDefinition({
  map,
  activeLayout,
  mapTitles,
  product,
  activeMapStyleName,
}) {
  const qualityImageCreator = useQualityImageCreator();

  const [highDefinitionImg, setHighDefinitionImg] = useState(null);
  const [lowDefinitionImg, setLowDefinitionImg] = useState(null);
  const [isLowDefActive, setIsLowDefActive] = useState(false);
  const [lightbox, setLightbox] = useState({
    open: false,
  });

  const createFinalImage = async () => {
    const imgLowDefinition = await qualityImageCreator({
      map,
      activeLayoutName: activeLayout,
      mapTitles,
      product,
      activeMapStyleName,
      options: {
        isLowDefinition: true,
      },
    });

    const imgHighDefinition = await qualityImageCreator({
      map,
      activeLayoutName: activeLayout,
      mapTitles,
      product,
      activeMapStyleName,
      options: {
        isLowDefinition: false,
      },
    });

    setLowDefinitionImg(imgLowDefinition);
    setHighDefinitionImg(imgHighDefinition);
  };

  useEffect(() => {
    createFinalImage();
  }, [activeLayout]);

  const switchActiveLow = (bool) => {
    setIsLowDefActive(bool);
    setLightbox({ open: true });
  };

  const isWideOrientation =
    product?.sizeObject?.orientation === ORIENTATIONS.wide;

  return (
    <>
      <HeadingText>Definice</HeadingText>
      <Container isWideOrientation={isWideOrientation}>
        <Item onClick={() => switchActiveLow(true)}>
          <StyledImg src={lowDefinitionImg} active={isLowDefActive} />
        </Item>
        <Item onClick={() => switchActiveLow(false)}>
          <StyledImg src={highDefinitionImg} active={!isLowDefActive} />
        </Item>
      </Container>
      {lightbox.open && (
        <Lightbox
          mainSrc={isLowDefActive ? lowDefinitionImg : highDefinitionImg}
          onCloseRequest={() => setLightbox({ open: false })}
        />
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-around;

  mobile {
    flex-direction: column;
  }
`;
// flex-direction: ${({ isWideOrientation }) =>
//   isWideOrientation ? "column" : "row"};

const Item = styled.div`
  flex-basis: 40%;
`;
// flex-basis: ${({ isWideOrientation }) =>
//   isWideOrientation ? "100%" : "40%"};

const StyledImg = styled.img`
  width: 100%;
  color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 0px 4px;
  color: ${({ active }) => active && color("cta_color")};
`;

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;
