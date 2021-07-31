import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Lightbox from "react-image-lightbox";

import CheckoutCta from "../Checkout/CheckoutCta";
import { color, mobile } from "utils";
import { createFinalImage } from "LibGlobal/createFinalImage";
import { useQualityImageCreator } from "Hooks/useQualityImageCreator";
import CustomLoader from "components/CustomLoader";

import { ORIENTATIONS } from "constants/constants";

const LOW_DENSITY_CONSTANT = 3;
const MID_DENSITY_CONSTANT = 2;
const HIGH_DENSITY_CONSTANT = 1;

export default function MapDefinition({
  map,
  activeLayout,
  mapTitles,
  product,
  setProduct,
  activeMapStyleName,
}) {
  const qualityImageCreator = useQualityImageCreator();

  const [highDefinitionImg, setHighDefinitionImg] = useState(null);
  const [lowDefinitionImg, setLowDefinitionImg] = useState(null);
  const [midDefinitionImg, setMidDefinitionImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lightbox, setLightbox] = useState({
    open: false,
  });

  const createFinalImage = async () => {
    setIsLoading(true);

    const imgLowDefinition = await qualityImageCreator({
      map,
      activeLayoutName: activeLayout,
      mapTitles,
      product,
      activeMapStyleName,
      options: {
        definitionConstant: LOW_DENSITY_CONSTANT,
      },
    });

    const imgMidDefinition = await qualityImageCreator({
      map,
      activeLayoutName: activeLayout,
      mapTitles,
      product,
      activeMapStyleName,
      options: {
        definitionConstant: MID_DENSITY_CONSTANT,
      },
    });

    const imgHighDefinition = await qualityImageCreator({
      map,
      activeLayoutName: activeLayout,
      mapTitles,
      product,
      activeMapStyleName,
      options: {
        definitionConstant: HIGH_DENSITY_CONSTANT,
      },
    });

    setLowDefinitionImg(imgLowDefinition);
    setMidDefinitionImg(imgMidDefinition);
    setHighDefinitionImg(imgHighDefinition);

    setIsLoading(false);
  };

  const mapBounds = JSON.stringify(map.getBounds());

  useEffect(() => {
    createFinalImage();
  }, [activeLayout, mapBounds]);

  const switchActiveLow = (constant) => {
    setLightbox({ open: true });

    setProduct((prev) => ({ ...prev, densityConstant: constant }));
  };

  const isWideOrientation =
    product?.sizeObject?.orientation === ORIENTATIONS.wide;

  const getDensitySource = (constant) => {
    switch (constant) {
      case LOW_DENSITY_CONSTANT:
        return lowDefinitionImg;
      case MID_DENSITY_CONSTANT:
        return midDefinitionImg;
      case HIGH_DENSITY_CONSTANT:
        return highDefinitionImg;
      default:
        alert("wrong definition constant");
    }
  };

  return (
    <>
      <HeadingText>Měřítko (podrobnost mapy)</HeadingText>
      <Container isWideOrientation={isWideOrientation}>
        <Item onClick={() => switchActiveLow(LOW_DENSITY_CONSTANT)}>
          {isLoading ? (
            <CustomLoader />
          ) : (
            <StyledImg
              src={lowDefinitionImg}
              active={product.densityConstant === LOW_DENSITY_CONSTANT}
            />
          )}
        </Item>
        <Item onClick={() => switchActiveLow(MID_DENSITY_CONSTANT)}>
          {isLoading ? (
            <CustomLoader />
          ) : (
            <StyledImg
              src={midDefinitionImg}
              active={product.densityConstant === MID_DENSITY_CONSTANT}
            />
          )}
        </Item>
        <Item onClick={() => switchActiveLow(HIGH_DENSITY_CONSTANT)}>
          {isLoading ? (
            <CustomLoader />
          ) : (
            <StyledImg
              src={highDefinitionImg}
              active={product.densityConstant === HIGH_DENSITY_CONSTANT}
            />
          )}
        </Item>
      </Container>
      {lightbox.open && (
        <Lightbox
          mainSrc={getDensitySource(product.densityConstant)}
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
  flex-direction: row;

  ${mobile`
    flex-direction: column;
  `};
`;

const Item = styled.div`
  flex-basis: 90%;

  ${mobile`
  flex-basis: 30%;
  `};
`;

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
