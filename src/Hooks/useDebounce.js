import React, { useRef } from "react";

export function useDebounce({ delayInMS }) {
  const valueRef = useRef({});

  let waitingPromises = {};

  return (fn, value) => {
    valueRef.current[fn.name] = value;

    if (!waitingPromises[fn.name]) {
      waitingPromises[fn.name] = setTimeout(() => {
        fn(valueRef.current[fn.name]);
      }, delayInMS);
    }
  };
}
