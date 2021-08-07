import Konva from "konva";
import React, { useEffect, useState, forwardRef, useRef } from "react";
import { render } from "react-dom";
import { Stage, Layer, Star, Text, Image } from "react-konva";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { getResizedImage } from "LibGlobal/getResizedImage";

import { useKonvaIconsSelector } from "redux/order/reducer";
import { setUpdateKonvaIcon } from "redux/order/actions";
import { getIsWideOrientation } from "LibGlobal/getIsWideOrientation";
import { getCurrentPixelRatio } from "LibGlobal/getCurrentPixelRatio";

import pin_real from "assets/icons/pin_real.png";
import dot from "assets/icons/dot.png";
import {
  RUNTIME_PIXEL_RATIO,
  PRINT_CANVAS_BASE_PX,
  MAP_ICONS,
} from "constants/constants";

// function generateShapes({ width, height }) {
//   return [...Array(10)].map((_, i) => ({
//     id: i.toString(),
//     x: 0.5 * width,
//     y: 0.5 * height, // Math.random()

//     rotation: Math.random() * 180,
//     isDragging: false,
//   }));
// }

const icon_size_constant = 0.09;

const KonvaStage = ({ product, width, height, isPrint, forwardedRef }) => {
  const dispatch = useDispatch();
  const iconsRedux = useKonvaIconsSelector();
  const [base64Img, setBase64Img] = useState(null);
  const isWideOrientation = getIsWideOrientation(product);

  const currentVersionPixelRatio = getCurrentPixelRatio(product.variantId);

  const stageLocalRef = useRef(null);
  const textRef = useRef(null);

  let multiple = 1;

  if (isWideOrientation) {
    multiple = PRINT_CANVAS_BASE_PX / width;
  } else {
    multiple = PRINT_CANVAS_BASE_PX / height;
  }

  let realCanvasWidth = width / RUNTIME_PIXEL_RATIO;
  let realCanvasHeight = height / RUNTIME_PIXEL_RATIO;

  if (isPrint) {
    realCanvasWidth =
      realCanvasWidth *
      multiple *
      currentVersionPixelRatio *
      RUNTIME_PIXEL_RATIO;
    realCanvasHeight =
      realCanvasHeight *
      multiple *
      currentVersionPixelRatio *
      RUNTIME_PIXEL_RATIO;
  }

  // const [stars, setStars] = useState(
  //   generateShapes({ width: realCanvasWidth, height: realCanvasHeight })
  // );

  useEffect(() => {
    const getIconBase64 = async () => {
      const image = await getResizedImage({
        originalImage: pin_real,
        max_height: icon_size_constant * realCanvasWidth,
        max_width: icon_size_constant * realCanvasWidth,
      });

      setBase64Img(image);
    };

    getIconBase64();
  }, [realCanvasWidth]);

  const handleDragStart = (e) => {
    const id = e.target.id();
    // setStars(
    //   stars.map((star) => {
    //     return {
    //       ...star,
    //       isDragging: star.id === id,
    //     };
    //   })
    // );
  };
  const handleDragEnd = (e) => {
    const newPos = e.target.position();
    console.log(
      "DragEndE:",
      { e, newPos },
      {
        x: newPos.x,
        width: e.currentTarget.width,
        realCanvasWidth,
        e_currentTarget: e.currentTarget,
      }
    );

    dispatch(
      setUpdateKonvaIcon({
        ...iconsRedux.find((icon) => icon.id === e.target.attrs.id),

        x: newPos.x / realCanvasWidth,
        y: newPos.y / realCanvasHeight,
      })
    );
    // setStars(
    //   stars.map((star) => {
    //     return {
    //       ...star,
    //       isDragging: false,
    //     };
    //   })
    // );
  };

  return (
    <Stage
      width={realCanvasWidth}
      height={realCanvasHeight}
      ref={forwardedRef ?? stageLocalRef}
    >
      <Layer>
        {iconsRedux.map((star) => {
          switch (star.iconType) {
            case MAP_ICONS.TEXT:
              return (
                <Text
                  ref={textRef}
                  text="Try to drag a star"
                  draggable
                  text="Ahoj, ja jsem clovek"
                  fontSize={25}
                  fontFamily="Calibri"
                  fill="lightGreen"
                  width={400}
                  padding={20}
                  align="center"
                  // onDblClick={}
                />
              );
            case MAP_ICONS.PIN_REAL:
              return (
                <Image
                  key={star.id}
                  id={star.id}
                  x={star.x * realCanvasWidth}
                  y={star.y * realCanvasHeight}
                  image={base64Img}
                  // numPoints={5}
                  // innerRadius={20}
                  // outerRadius={40}
                  // fill="#89b717"
                  // opacity={0.8}
                  draggable
                  // rotation={star.rotation}
                  // shadowColor="black"
                  // shadowBlur={10}
                  // shadowOpacity={0.6}
                  // shadowOffsetX={star.isDragging ? 10 : 5}
                  // shadowOffsetY={star.isDragging ? 10 : 5}
                  // scaleX={star.isDragging ? 1.2 : 1}
                  // scaleY={star.isDragging ? 1.2 : 1}
                  offsetX={(icon_size_constant * realCanvasWidth) / 2}
                  offsetY={(icon_size_constant * realCanvasWidth) / 2}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              );
          }
        })}
      </Layer>
    </Stage>
  );
};

// <Star
//   key={star.id}
//   id={star.id}
//   x={star.x}
//   y={star.y}
//   numPoints={5}
//   innerRadius={20}
//   outerRadius={40}
//   fill="#89b717"
//   opacity={0.8}
//   draggable
//   rotation={star.rotation}
//   shadowColor="black"
//   shadowBlur={10}
//   shadowOpacity={0.6}
//   shadowOffsetX={star.isDragging ? 10 : 5}
//   shadowOffsetY={star.isDragging ? 10 : 5}
//   scaleX={star.isDragging ? 1.2 : 1}
//   scaleY={star.isDragging ? 1.2 : 1}
//   onDragStart={handleDragStart}
//   onDragEnd={handleDragEnd}
// />

// <Image
//   key={star.id}
//   id={star.id}
//   x={star.x}
//   y={star.y}
//   image={base64Img}
//   // numPoints={5}
//   // innerRadius={20}
//   // outerRadius={40}
//   // fill="#89b717"
//   // opacity={0.8}
//   // draggable
//   // rotation={star.rotation}
//   // shadowColor="black"
//   // shadowBlur={10}
//   // shadowOpacity={0.6}
//   // shadowOffsetX={star.isDragging ? 10 : 5}
//   // shadowOffsetY={star.isDragging ? 10 : 5}
//   // scaleX={star.isDragging ? 1.2 : 1}
//   // scaleY={star.isDragging ? 1.2 : 1}
//   onDragStart={handleDragStart}
//   onDragEnd={handleDragEnd}
// />;

// const rootElement = document.getElementById("root");
// console.log("Goin_To_render_konva_inside", {
//   el: document.getElementById("map"),
// });
// render(<KonvaStage />, document.getElementById("map"));

export default KonvaStage;

const StyledImg = styled.img`
  // display: none;
  position: absolute;
  width: 200px;
  height: 200px;
  bottom: 0px;
`;
