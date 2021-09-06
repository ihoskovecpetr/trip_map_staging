import React, { useState, useEffect, useMemo, useRef } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN;
let geocoder;

export default function GeocoderInput({
  id,
  map,
  value,
  setResult,
  placeholder,
}) {
  const ref = useRef();

  useEffect(() => {
    geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: {
        // color: "transparent",
      },
      placeholder: placeholder ?? "Další bod cesty",
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
