import React, { useState, useEffect, useMemo, useRef } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";

import { MOBILE_WIDTH_SIZE_PX } from "constants/constants";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN;
let geocoder;

let counterRemove = 0;
let counter = 0;
let counterInstance = 0;

export default function GeocoderInput({ id, map, value, setResult }) {
  //   const [result, setResult] = useState();
  const ref = useRef();

  useEffect(() => {
    console.log("Creating_instance", counterInstance);
    counterInstance++;

    geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: {
        // color: "transparent",
      },
      placeholder: "Zadejte lokalitu" + counterInstance,
    });
    // document.getElementById(id).appendChild(geocoder.onAdd(map));
    geocoder.addTo(ref.current);
  }, [id]);

  useEffect(() => {
    const childNodes = ref.current?.childNodes;

    if (childNodes && value) {
      childNodes[0].childNodes[1].value = value;
    }

    geocoder.on("result", transformResult);

    return () => {
      counterRemove++;

      geocoder.off("result", transformResult);
    };
  }, [map]);

  const transformResult = (e) => {
    setResult(e);

    geocoder.clear(); // to remove blue dot
    // document.getElementById(id).innerHTML = "Filled";
    // document.getElementById(id).innerHTML = value;
  };

  return (
    <p>
      <div id={id} ref={ref}></div>
    </p>
  );
}
