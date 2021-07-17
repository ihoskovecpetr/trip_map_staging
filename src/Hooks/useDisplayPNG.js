import { useState, useEffect, useMemo } from "react";

export function useDisplayPNG({ id }) {
  if (!id) {
    console.log("Fill in 'id' parameter to this hook to work");
  }

  const [displayPNG, setDisplayPNG] = useState(false);

  useEffect(() => {
    const imageEl = document.getElementById(id);

    const eventCallback = (event, name) => {};

    console.log({ imageEl, id });

    if (imageEl) {
      imageEl.addEventListener("error", (event) => {
        eventCallback("Error_Z_hooku_pro_id", id, event);
        // setDisplayPNG(true);
      });
    }
    return () => {
      imageEl?.removeEventListener("error", (event) => {
        eventCallback("Error", event);
      });
    };
  }, []);

  const displayPNG_Memo = useMemo(() => {
    return displayPNG;
  }, [displayPNG]);

  return { displayPNG: displayPNG_Memo };
}
