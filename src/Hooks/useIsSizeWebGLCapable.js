import React, { useState, useEffect } from "react";
import {
  PRINT_CANVAS_BASE_PX,
  PIXEL_RATIO_LG,
  PIXEL_RATIO_MD,
} from "constants/constants";

export function useIsSizeWebGLSizeCapable() {
  const [maxPixels, setMaxPixels] = useState();
  const [isLargeSizeCapable, setIsLargeSizeCapable] = useState(false);
  const [isMidSizeCapable, setIsMidSizeCapable] = useState(false);

  useEffect(() => {
    const checkWebGLMaxSize = () => {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl");
      return gl.getParameter(gl.MAX_TEXTURE_SIZE);
    };

    const maxSidePx = checkWebGLMaxSize();

    setMaxPixels(maxSidePx);
    setIsLargeSizeCapable(maxSidePx >= PRINT_CANVAS_BASE_PX * PIXEL_RATIO_LG);
    setIsMidSizeCapable(maxSidePx >= PRINT_CANVAS_BASE_PX * PIXEL_RATIO_MD);
  }, []);

  return { maxPixels, isLargeSizeCapable, isMidSizeCapable };
}
