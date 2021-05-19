import { useState, useEffect, useMemo } from "react";

export function useElementDimensions(element_id) {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (!window) {
        return;
      }

      setDimensions({
        height: document.getElementById(element_id).getBoundingClientRect()
          .height,
        width: document.getElementById(element_id).getBoundingClientRect()
          .width,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);

  const dimensions_memo = useMemo(() => {
    return dimensions;
  }, [dimensions]);

  return dimensions_memo;
}
