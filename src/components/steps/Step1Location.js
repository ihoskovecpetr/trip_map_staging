/** @jsx jsx */
import { useEffect } from "react";
import { jsx } from "theme-ui";
import produce from "immer";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import { color } from "utils";

import { useIsMobile } from "Hooks/useIsMobile";
import PopoverGuide from "components/PopoverGuide";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN;
let geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: {
    // color: "transparent",
  },
  placeholder: "Zadejte lokalitu",
});

export default function Step1Location({
  map,
  setMapCoordinates,
  setMapTitles,
}) {
  const { isMobile } = useIsMobile();

  useEffect(() => {
    document.getElementById("geocoder").innerHTML = "";
    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

    geocoder.container.style.width = "100%";

    document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0].focus();
  }, []);

  useEffect(() => {
    geocoder.on("result", pantoEventLocation);

    return () => {
      geocoder.off("result", pantoEventLocation);
    };
  }, [map]);

  const pantoEventLocation = (e) => {
    setMapCoordinates(e.result.geometry.coordinates);

    setMapTitles((prev) =>
      produce(prev, (draftState) => {
        const placeNameArr = e.result.place_name.split(",");
        const subtitle = placeNameArr[placeNameArr.length - 1]?.trim();
        draftState.heading.text = placeNameArr[0] ?? "";
        draftState.subtitle.text = subtitle ? `— ${subtitle} —` : "";
      })
    );

    const { bbox } = e.result;

    if (bbox) {
      map?.fitBounds([
        [bbox[0], bbox[1]], // southwestern corner of the bounds
        [bbox[2], bbox[3]], // northeastern corner of the bounds
      ]);
    } else {
      map?.flyTo({
        center: e.result.geometry.coordinates,
        zoom: 9,
      });
      // map?.panTo(e.result.geometry.coordinates);
      // map.setZoom(13);
    }

    geocoder.clear(); // to remove blue dot
    document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0].blur();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div sx={styles.container}>
      {!isMobile && <HeadingText>1. Zadejte lokalitu</HeadingText>}

      {/* <PopoverGuide relatedId="geocoder" legend="Začni zadáním hledaného města"> */}
      <div
        id="geocoder"
        class="geocoder"
        sx={styles.locationInput}
        style={{ marginTop: isMobile ? "10px" : "10px" }}
      ></div>
      {/* </PopoverGuide> */}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
  },

  locationInput: {
    width: "100%",
    border: "1px solid",
    borderColor: "cta_color",
    borderRadius: "5px",
    marginBottom: ["210px", null, null, "10px"],

    "& div": {
      width: "100%",
      maxWidth: "100%",
    },
  },
  absoluteBtnWrap: {
    position: "fixed",
    top: ["85vh", "85vh", "85vh", "90vh"],
    left: "0px",
    height: 0,
    width: ["100%", "100%", "100%", "40%", "30%"],
  },
};

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;
