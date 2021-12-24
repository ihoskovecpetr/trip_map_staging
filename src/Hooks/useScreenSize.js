import React, { useState, useEffect } from "react";
const isClient = typeof window === "object";

export function useScreenSize() {
  const [windowSize, setWindowSize] = useState(getSize);

  function getSize(e) {
    const viewport = e?.target;

    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
      visualViewportHeight: isClient && viewport ? viewport.height : undefined,
      visualViewportWidth: isClient && viewport ? viewport.width : undefined,
    };
  }

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize(e) {
      const newSizes = getSize(e);
      setWindowSize(newSizes);
    }

    window.addEventListener("resize", handleResize);
    // window.addEventListener("keydown", handleResize);

    window.visualViewport.addEventListener("scroll", handleResize);
    window.visualViewport.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // window.removeEventListener("keydown", handleResize);

      window.visualViewport.removeEventListener("scroll", handleResize);
      window.visualViewport.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
