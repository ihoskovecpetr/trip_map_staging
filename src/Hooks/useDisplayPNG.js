import { useState, useEffect, useMemo } from "react";

export function useDisplayPNG({ id }) {
  if (!id) {
    console.log("Fill in 'id' parameter to this hook to work");
  }

  const [displayPNG, setDisplayPNG] = useState(true);

  useEffect(() => {
    const imageEl = document.getElementById(id);

    const eventCallback = (event, name) => {};

    if (imageEl) {
      imageEl.addEventListener("error", (event) => {
        console.log("IMG_Error_Event: ", { event });
        eventCallback("Error_Z_hooku_pro_id", id, event);
        // setDisplayPNG(true);
      });

      imageEl.addEventListener("load", (event) => {
        console.log("IMG_Image_has_fully_loaded", { event });
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
