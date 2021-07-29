import React, { useState, useEffect, useMemo } from "react";
import { MOBILE_WIDTH_SIZE_PX } from "../constants/constants";

export function useWebGLSize() {
  const [maxPixels, setMaxPixels] = useState();

  const checkWebGLMaxSize = () => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    return gl.getParameter(gl.MAX_TEXTURE_SIZE);
  };

  console.log({ maxPixels });

  useEffect(() => {
    setMaxPixels(checkWebGLMaxSize());
  }, []);

  return { maxPixels };
}
