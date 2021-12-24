import React, { useRef } from "react";

export function useDebounce({ delayInMS }) {
  const valueRef = useRef({});

  let waitingPromises = {};

  return (fn, value) => {
    valueRef.current[fn.name] = value;

    if (!waitingPromises[fn.name]) {
      waitingPromises[fn.name] = setTimeout(() => {
        console.log("Executing_bounce", {
          name: fn.name,
          value,
          waitingPromises,
        });
        fn(valueRef.current[fn.name]);
        waitingPromises[fn.name] = null;
      }, delayInMS);
    }
  };
}
