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
import pin_cartoon_2 from "assets/icons/pin_cartoon_2.png";
import location_black from "assets/icons/location_black.png";
import red_flag from "assets/icons/red_flag.png";

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

const icon_size_constant = 0.18;

const KonvaStage = ({ product, width, height, isPrint, forwardedRef }) => {
  const dispatch = useDispatch();
  const iconsRedux = useKonvaIconsSelector();
  const [base64Img, setBase64Img] = useState(null);
  const isWideOrientation = getIsWideOrientation(product);

  const currentVersionPixelRatio = getCurrentPixelRatio(product.variantId);

  const stageLocalRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    layerRef.current?.cache({ pixelRatio: 4 });

    console.log({
      layerRefCanvas: layerRef.current?.getCanvas(),
    });
  }, []);

  let multiple = 1;
  let baseLongSize = 0;

  let realCanvasWidth = width / RUNTIME_PIXEL_RATIO;
  let realCanvasHeight = height / RUNTIME_PIXEL_RATIO;

  if (isWideOrientation) {
    multiple = PRINT_CANVAS_BASE_PX / width;
    baseLongSize = realCanvasWidth;
  } else {
    multiple = PRINT_CANVAS_BASE_PX / height;
    baseLongSize = realCanvasHeight;
  }

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
    baseLongSize =
      baseLongSize * multiple * currentVersionPixelRatio * RUNTIME_PIXEL_RATIO;
  }

  useEffect(() => {
    const getIconBase64 = async () => {
      // const image = await getResizedImage({
      //   originalImage: pin_real,
      //   max_height: icon_size_constant * baseLongSize,
      //   max_width: icon_size_constant * baseLongSize,
      // });

      const promises = [
        getResizedImage({
          originalImage: pin_real,
          max_height: icon_size_constant * baseLongSize,
          max_width: icon_size_constant * baseLongSize,
        }),
        getResizedImage({
          originalImage: pin_cartoon_2,
          max_height: icon_size_constant * baseLongSize,
          max_width: icon_size_constant * baseLongSize,
        }),
        getResizedImage({
          originalImage: location_black,
          max_height: icon_size_constant * baseLongSize,
          max_width: icon_size_constant * baseLongSize,
        }),
        getResizedImage({
          originalImage: red_flag,
          max_height: icon_size_constant * baseLongSize,
          max_width: icon_size_constant * baseLongSize,
        }),
      ];

      const [
        pin_real_img,
        pin_cartoon_img,
        location_black_img,
        red_flag_img,
      ] = await Promise.all(promises);

      setBase64Img({
        [MAP_ICONS.PIN_REAL]: pin_real_img,
        [MAP_ICONS.PIN_CARTOON_2]: pin_cartoon_img,
        [MAP_ICONS.LOCATION_BLACK]: location_black_img,
        [MAP_ICONS.RED_FLAG]: red_flag_img,
      });
    };

    getIconBase64();
  }, [baseLongSize]);

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
  const handleDragEnd = (icon) => (e) => {
    const newPos = e.target.position();

    dispatch(
      setUpdateKonvaIcon({
        ...icon,

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

  const getImageComponent = (icon) => (
    <Image
      key={icon.id}
      id={icon.id}
      pixelRatio={4}
      imageSmoothingEnabled={true}
      hitCanvasPixelRatio={4}
      x={icon.x * realCanvasWidth}
      y={icon.y * realCanvasHeight}
      image={base64Img && base64Img[icon.iconType]}
      draggable
      offsetX={(icon_size_constant * realCanvasWidth) / 2}
      offsetY={(icon_size_constant * realCanvasHeight) / 2}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd(icon)}
    />
  );

  return (
    <Stage
      width={realCanvasWidth}
      height={realCanvasHeight}
      ref={forwardedRef ?? stageLocalRef}
    >
      <Layer ref={layerRef}>
        {iconsRedux.map((star) => {
          switch (star.iconType) {
            case MAP_ICONS.TEXT:
              return (
                <Text
                  x={star.x * realCanvasWidth}
                  y={star.y * realCanvasHeight}
                  draggable
                  text={star.textValue}
                  fontSize={0.04 * realCanvasWidth}
                  fontFamily="Calibri"
                  fill="blue"
                  width={0.4 * realCanvasWidth}
                  height={0.2 * realCanvasWidth}
                  offsetX={0.2 * realCanvasWidth}
                  offsetY={0.2 * realCanvasHeight}
                  padding={20}
                  align="center"
                  onDragEnd={handleDragEnd(star)}
                />
              );
            default:
              return getImageComponent(star);
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
