export const getUpdatedMapSizes = ({
  ratio,
  mapWrapWrapHeight,
  mapWrapWrapWidth,
  isMobile,
}) => {
  const isHighSetup = ratio > 1;

  let heightTry;
  let widthTry;

  const wrapElemRectangle = document
    .getElementById("map_available_space_id")
    .getBoundingClientRect();

  const mapHeightRect = wrapElemRectangle.height;

  const mapWidthRect = wrapElemRectangle.width;

  const mapHeightFresh =
    mapHeightRect < mapWrapWrapHeight ? mapHeightRect : mapWrapWrapHeight;
  const mapWidthFresh =
    mapWidthRect < mapWrapWrapWidth ? mapWidthRect : mapWrapWrapWidth;

  if (isHighSetup) {
    heightTry = mapHeightFresh;
    widthTry = heightTry / ratio;

    if (widthTry > mapWidthFresh) {
      widthTry = mapWidthFresh;
      heightTry = widthTry * ratio;
    }
  } else {
    widthTry = mapWidthFresh;
    heightTry = widthTry * ratio;
    if (heightTry > mapHeightFresh) {
      heightTry = mapHeightFresh;
      widthTry = heightTry / ratio;
    }
  }

  // const baseSize = isMobile ? 0.8 : 0.5;
  // const baseLong = innerWidth * baseSize; // - headerHeight;
  // const updWidth = isHighSetup ? mapWrapWrapHeight / ratio : mapWrapWrapWidth;
  // const updHeight = isHighSetup ? mapWrapWrapHeight : mapWrapWrapWidth * ratio;

  return {
    updWidth: widthTry * 0.85,
    updHeight: heightTry * 0.85,
  };
};
