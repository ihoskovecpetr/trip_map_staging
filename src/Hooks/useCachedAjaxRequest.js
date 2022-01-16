import React, { useState, useEffect } from "react";
import { getDirectionCoordinates } from "LibGlobal/getDirectionCoordinates";

const cachedResults = {};
let promise = null;

export function useCachedAjaxRequest({ fromLocation, toLocation }) {
  const [result, setResult] = useState(null);

  const asyncGetDirection = async (
    fromLocation,
    toLocation,
    encodedLocation
  ) => {
    const direction = await getDirectionCoordinates(fromLocation, toLocation);
    cachedResults[encodedLocation] = direction;
    setResult(direction);
  };

  const exec = async () => {
    const encodedLocation = encodeURIComponent(`${fromLocation};${toLocation}`);
    const result = cachedResults[encodedLocation];

    if (result) {
      promise = null;

      setResult(result);
    }

    if (promise) {
      setResult([]);
    }

    console.log("got_to_calling", { cachedResults });

    promise = true;
    asyncGetDirection(fromLocation, toLocation, encodedLocation);
    setResult([]);
  };

  useEffect(() => {
    setResult(null);
    exec();
  }, [fromLocation, toLocation]);

  return result;
}
