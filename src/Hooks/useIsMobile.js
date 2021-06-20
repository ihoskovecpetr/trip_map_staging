import React, { useState, useEffect, useMemo } from "react";
import { MOBILE_WIDTH_SIZE_PX } from "../constants/constants";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    console.log("HandlingResize", window.innerWidth);
    if (window.innerWidth <= MOBILE_WIDTH_SIZE_PX) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    console.log("New_Mobile_Flag: ", { isMobile });
  }, [isMobile]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const isMobileMemo = useMemo(() => {
    return isMobile;
  }, [isMobile]);

  return { isMobile: isMobileMemo };
}
