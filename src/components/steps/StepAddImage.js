/** @jsx jsx */
import { useEffect, useState, useRef, useCallback } from "react";
import { jsx } from "theme-ui";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";

import { createUploadRequest } from "LibGlobal/createUploadRequest";
import { color, fontSize, fontWeight, mobile } from "utils";
import { useIsMobile } from "Hooks/useIsMobile";
import { getMaxGroupIndex } from "LibGlobal/getMaxGroupIndex";
import { getLoadedIconImages } from "LibGlobal/getLoadedIconImages";
import { MAP_STYLED_AND_FLIGHT_COLOR, ICON_NAMES } from "constants/constants";

import { addNewIcon, removeImage, addNewImage } from "redux/order/actions";

import {
  useGetImages,
  useActiveMapStyleSelector,
  useActiveLayoutSelector,
} from "redux/order/reducer";

export default function StepAddImage({ map, index }) {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const router = useRouter();
  const imagesRedux = useGetImages();
  const journeysRef = useRef();
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const currentGroupRef = useRef(currentGroupIndex);
  // const activeMapStyleName = useActiveMapStyleSelector();
  const activeLayoutName = useActiveLayoutSelector();

  const [availableIcons, setAvailableIcons] = useState([]);

  useEffect(() => {
    currentGroupRef.current = currentGroupIndex;
  }, [currentGroupIndex]);

  useEffect(() => {
    map?.on("error", function (e) {
      console.log({ ErrorMap: e });
    });

    map?.on("load", function () {});
  }, [map]);

  useEffect(() => {
    journeysRef.current = imagesRedux;

    const maxGroupIndex = getMaxGroupIndex(imagesRedux ?? []);
    setCurrentGroupIndex(maxGroupIndex);

    if (!map) {
      return;
    }
  }, [imagesRedux]);

  const removeIconRedux = (iconObj) => {
    console.log({ iconObj });
    dispatch(removeIcon(iconObj));
  };

  const handleAddImage = (e, data) => {
    const maxGroupIndex = getMaxGroupIndex(imagesRedux ?? []);

    console.log({
      e,
      attrId: e.target.getAttribute("id"),
      type: typeof e.target,
      elemImg: <img />,
      data,
      value: e.target.id,
      el: document.getElementById(e.target.getAttribute("id")),
    });

    // dispatch(
    //   addNewImage({
    //     groupIndex: maxGroupIndex + 1,
    //     location: [map.getCenter().lng, map.getCenter().lat],
    //     sourceId: "sourceImageId" + maxGroupIndex,
    //     title: "newTitle",
    //     iconType: "custom",
    //     element: e.target,
    //   })
    // );
  };

  return (
    <Container>
      <HeadingText>{index}. Přidejte Ikony</HeadingText>
      <StyledButton
        onClick={() => {
          handleAddIcon(ICON_NAMES.pin);
        }}
      >
        <AddIcon />
        Nová ikona
      </StyledButton>
      <HorizontalLine /> <HorizontalLine />
      {availableIcons.map((icon) => (
        <StyledIconImg
          src={icon[2]}
          onClick={() => {
            handleAddIcon(icon[0]);
          }}
        />
      ))}
      <input
        type="file"
        style={{ width: "100%", height: "50px" }}
        accept="image/png, image/jpeg"
        onInput={(e) => {
          const reader = new FileReader();
          reader.onloadend = async function (e) {
            const imageEl = document.getElementById("result_image");
            imageEl.src = e.target.result;
            // imageEl.onload = async () => {};
            const result = await createUploadRequest(
              e.target.result,
              () => {},
              axios
            );

            console.log({ result });

            if (result?.status === 200) {
              // setAvailableIcons((prev) => [...prev, ["custom", imageEl]]);
              const maxGroupIndex = getMaxGroupIndex(imagesRedux ?? []);

              dispatch(
                addNewImage({
                  groupIndex: maxGroupIndex + 1,
                  location: [map.getCenter().lng, map.getCenter().lat],
                  sourceId: "sourceImageId" + maxGroupIndex,
                  title: "newTitle",
                  iconType: "custom",
                  imageUrl: result.data.url,
                })
              );
            }
          };
          const result = reader.readAsDataURL(e.target.files[0]);
          // console.log(result);
        }}
      />
      <img
        id="result_image"
        style={{ height: "150px", width: "150px" }}
        onClick={handleAddImage}
      />
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 50px;
`;

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 0;
  letter-spacing: 1.1px;

  ${mobile`
    margin-top: 20px;
  `}
`;

const HorizontalLine = styled.p`
  background-color: ${color("muted")};
  height: 1px;
  width: 100%;
  margin: 5px 0;
`;

const StepsWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const IconsWrap = styled.div``;

const StyledIconImg = styled.img`
  width: 50px;
  height: 50px;
`;

const StyledStepLabel = styled(StepLabel)`
  .MuiStepIcon-active {
    color: ${color("secondary")} !important;
    text {
      fill: white !important;
    }
  }
  .MuiStepIcon-completed {
    color: ${color("cta_color")} !important;
    color: ${({ color }) => color} !important;
    text {
      fill: white !important;
    }
  }
`;

const StyledButton = styled(Button)`
  color: white !important;
  background-color: ${color("heading_secondary")} !important;
  text-transform: unset !important;
  margin-bottom: 0px !important;

  ${mobile`
    margin-bottom: 20px !important;
  `}
`;

const Flex1 = styled.div`
  flex: 1;
`;

const StyledDeleteForeverIcon = styled(DeleteForeverIcon)`
  margin-left: 5px;
`;

const FlexCenterWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCreateIcon = styled(CreateIcon)`
  cursor: pointer !important;
  width: 0.8em !important;
  height: 0.8em !important;
  margin: 0 5px !important;
`;
