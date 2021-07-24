import { useState, useEffect, useMemo } from "react";

export function useElementDimensions(element_id) {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (!window) {
        return;
      }

      console.log("Handling_resize");

      setDimensions({
        height:
          document.getElementById(element_id)?.getBoundingClientRect().height ||
          0,
        width:
          document.getElementById(element_id)?.getBoundingClientRect().width ||
          0,
      });
    };

    handleResize();

    const measuredElement = document.getElementById(element_id);
    const resizeObserver = new ResizeObserver(handleResize);

    resizeObserver?.observe(measuredElement);
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    const timeout = setTimeout(() => {
      handleResize();
    }, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
      resizeObserver?.unobserve(measuredElement);

      clearTimeout(timeout);
    };
  }, []);

  const dimensions_memo = useMemo(() => {
    return dimensions;
  }, [dimensions]);

  return dimensions_memo;
}
