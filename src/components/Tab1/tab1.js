/** @jsx jsx */
import { useEffect, useState } from "react";
import { jsx, Text, Button, Link } from "theme-ui";

import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import NextTabBtn from "../NextTabBtn/NextTabBtn";
import { useIsMobile } from "../../Hooks/useIsMobile";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGV0cmhvc2tvdmVjIiwiYSI6ImNrbHY2ZXY5eDJuaGkyb24xMXpzOHY2cXAifQ.g7wKRkK7WFwczUmDOYwCtQ";
let geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: {
    // color: "transparent",
  },
});

export default function Tab1({ map, setMapCoordinates, nextTab }) {
  const { isMobile } = useIsMobile();

  useEffect(() => {
    document.getElementById("geocoder").innerHTML = "";
    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

    geocoder.container.style.width = "100%";
  }, []);

  const pantoEventLocation = (e) => {
    setMapCoordinates(e.result.geometry.coordinates);

    map?.panTo(e.result.geometry.coordinates);
  };

  useEffect(() => {
    geocoder.on("result", pantoEventLocation);

    return () => {
      geocoder.off("result", pantoEventLocation);
    };
  }, [map]);

  return (
    <div sx={styles.container}>
      {!isMobile && (
        <Text as="p" className="description" sx={styles.subtitle}>
          Zadejte lokalitu
        </Text>
      )}
      <div
        id="geocoder"
        class="geocoder"
        sx={styles.locationInput}
        style={{ marginTop: isMobile ? "0px" : "20px", marginBottom: "20px" }}
      ></div>

      <NextTabBtn
        onClick={() => {
          nextTab();
        }}
        width="100%"
        margin="0px 0px"
      >
        Další krok
      </NextTabBtn>
    </div>
  );
}

const styles = {
  container: {
    padding: "10px",
    width: "100%",
    overflow: "visible",
    padding: "20px",
    minHeight: "100vh",
  },
  subtitle: {
    fontWeight: 700,
    textAlign: "left",
  },
  TabWrap: {
    display: "flex",
    width: "100%",
  },
  Tab: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
    "&.active": {
      borderBottom: "3px solid black",
    },
  },
  locationInput: {
    width: "100%",
    // boxShadow: "0 0 10px #fe6769",
    border: "2px solid",
    borderColor: "cta_color",
    borderRadius: "5px",
    "& div": {
      width: "100%",
      maxWidth: "100%",
    },
  },
};
