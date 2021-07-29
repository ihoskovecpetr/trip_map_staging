import React, { useState, useEffect } from "react";
import { PRINT_CANVAS_BASE_PX, PIXEL_RATIO_LG } from "constants/constants";

export function useWebGLSize() {
  const [maxPixels, setMaxPixels] = useState();
  const [isLargeSizeCapable, setIsLargeSizeCapable] = useState(false);

  const checkWebGLMaxSize = () => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    return gl.getParameter(gl.MAX_TEXTURE_SIZE);
  };

  useEffect(() => {
    const maxSidePx = checkWebGLMaxSize();

    setMaxPixels(maxSidePx);
    setIsLargeSizeCapable(maxSidePx >= PRINT_CANVAS_BASE_PX * PIXEL_RATIO_LG);
  }, []);

  return { maxPixels, isLargeSizeCapable };
}
