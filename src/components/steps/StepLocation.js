/** @jsx jsx */
import { useEffect } from "react";
import { jsx } from "theme-ui";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";

import { color } from "utils";
import { setNewTitle, setNewSubtitle } from "redux/order/actions";
import { useIsMobile } from "Hooks/useIsMobile";
import PopoverGuide from "components/PopoverGuide";
import { setMapCoordinatesAction } from "redux/order/actions";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN;
let geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: {
    // color: "transparent",
  },
  placeholder: "Zadejte lokalitu",
});

export default function StepLocation({ map, index }) {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    document.getElementById("geocoder").innerHTML = "";
    // document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
    geocoder.addTo("#geocoder");

    geocoder.container.style.width = "100%";
  }, []);

  useEffect(() => {
    geocoder.on("result", pantoEventLocation);

    return () => {
      geocoder.off("result", pantoEventLocation);
    };
  }, [map]);

  const pantoEventLocation = (e) => {
    dispatch(setMapCoordinatesAction(e.result.geometry.coordinates));

    const placeNameArr = e.result.place_name.split(",");
    const subtitle = placeNameArr[placeNameArr.length - 1]?.trim();

    const newTitle = placeNameArr[0];
    const newSubTitle = subtitle ? `— ${subtitle} —` : "";

    dispatch(setNewTitle(newTitle));
    dispatch(setNewSubtitle(newSubTitle));

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
    }

    geocoder.clear(); // to remove blue dot

    setTimeout(() => {
      document
        .getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0]
        .blur();
      geocoder.clear(); // to remove blue dot
    }, 500);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div sx={styles.container} key={`step_${index}`}>
      {!isMobile && <HeadingText>{index}. Zadejte lokalitu</HeadingText>}

      <div
        id="geocoder"
        class="geocoder"
        sx={styles.locationInput}
        style={{ marginTop: isMobile ? "10px" : "10px" }}
      ></div>
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
