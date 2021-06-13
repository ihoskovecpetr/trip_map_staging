/** @jsx jsx */
import { useEffect } from "react";
import { jsx, Text } from "theme-ui";
import produce from "immer";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import NextTabBtn from "../NextTabBtn/NextTabBtn";
import { useIsMobile } from "../../Hooks/useIsMobile";
import { orientationSwitcher } from "../../LibGlobal/getOrientationSwitcher";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN;
let geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: {
    // color: "transparent",
  },
});

export default function Step1Location({
  map,
  nextTab,
  setMapCoordinates,
  setMapTitles,
}) {
  const { isMobile } = useIsMobile();

  useEffect(() => {
    document.getElementById("geocoder").innerHTML = "";
    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

    geocoder.container.style.width = "100%";
  }, []);

  useEffect(() => {
    geocoder.on("result", pantoEventLocation);

    return () => {
      geocoder.off("result", pantoEventLocation);
    };
  }, [map]);

  const pantoEventLocation = (e) => {
    console.log("Pan pantoEventLocation");
    setMapCoordinates(e.result.geometry.coordinates);

    setMapTitles((prev) =>
      produce(prev, (draftState) => {
        const placeNameArr = e.result.place_name.split(",");
        console.log("Is there test?? ", draftState);
        draftState.heading.text = placeNameArr[0] ?? "";
        draftState.subtitle.text = placeNameArr[placeNameArr.length - 1] ?? "";
      })
    );

    const { bbox } = e.result;

    console.log({ bbox, result: e.result });

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
  };

  return (
    <div sx={styles.container}>
      {!isMobile && (
        <Text as="p" className="description" sx={styles.headingDesc}>
          Zadejte lokalitu
        </Text>
      )}
      <div
        id="geocoder"
        class="geocoder"
        sx={styles.locationInput}
        style={{ marginTop: isMobile ? "0px" : "20px", marginBottom: "60px" }}
      ></div>

      {/* <NextTabBtn
        onClick={() => {
          nextTab();
        }}
        width="100%"
        margin="0px 0px"
      >
        Další krok
      </NextTabBtn> */}
      {/* <div sx={styles.absoluteBtnWrap}>
        <NextTabBtn
          onClick={() => {
            nextTab();
          }}
          margin="20px 0px 75px"
        >
          Další krok
        </NextTabBtn>
      </div> */}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
  },
  headingDesc: {
    fontWeight: 500,
    textAlign: "left",
    color: "grey",
    margin: "20px 0",
    letterSpacing: "1.1px",
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
  absoluteBtnWrap: {
    position: "fixed",
    top: ["85vh", "85vh", "85vh", "90vh"],
    left: "0px",
    height: 0,
    width: ["100%", "100%", "100%", "40%", "30%"],
  },
};