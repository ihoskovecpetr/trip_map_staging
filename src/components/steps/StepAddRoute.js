/** @jsx jsx */
import { useEffect } from "react";
import { jsx } from "theme-ui";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import * as turf from "@turf/turf";

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

const origin = [-122.414, 37.776];

// Washington DC
const destination = [-77.032, 38.913];

const route = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [origin, destination],
      },
    },
  ],
};

const point = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: origin,
      },
    },
  ],
};

export default function StepAddRoute({ map }) {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const lineDistance = turf.length(route.features[0]);

    const arc = [];

    const steps = 7;

    for (let i = 0; i < lineDistance; i += lineDistance / steps) {
      const segment = turf.along(route.features[0], i);
      arc.push(segment.geometry.coordinates);
    }

    console.log({ AcrLength: arc.length });
    // Update the route with calculated arc coordinates
    route.features[0].geometry.coordinates = arc;

    map?.on("load", function () {
      map.addSource("route", {
        type: "geojson",
        data: route,
      });

      map.addSource("point", {
        type: "geojson",
        data: point,
      });

      map.addLayer({
        id: "route",
        source: "route",
        type: "line",
        paint: {
          "line-width": 2,
          "line-color": "#007cbf",
        },
      });
    });
  }, [map]);

  return (
    <div sx={styles.container}>
      {!isMobile && <HeadingText>1. Zadejte lokalitu</HeadingText>}

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
