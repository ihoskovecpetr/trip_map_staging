/** @jsx jsx */
import { useEffect, useState } from "react";
import { jsx, Text, Button, Link } from "theme-ui";
import produce from "immer";

import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import NextTabBtn from "../NextTabBtn/NextTabBtn";
import { useIsMobile } from "../../Hooks/useIsMobile";
import { orientationSwitcher } from "../../LibGlobal/getOrientationSwitcher";

console.log({
  NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN:
    process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN,
  process_env: process.env,
  NAme: process.env.MONGO_DB_NAME,
});

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN;
let geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: {
    // color: "transparent",
  },
});

const isProductWide = (product) => {
  if (product.sizeObject.ratio < 1) {
    return true;
  }
  return false;
};

export default function Tab1({
  map,
  setMapCoordinates,
  product,
  setProduct,
  setMapTitles,
  nextTab,
}) {
  const { isMobile } = useIsMobile();

  useEffect(() => {
    document.getElementById("geocoder").innerHTML = "";
    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

    geocoder.container.style.width = "100%";
    geocoder.container.style.maxWidth = "320px";
  }, []);

  const pantoEventLocation = (e) => {
    setMapCoordinates(e.result.geometry.coordinates);

    console.log({ result: e.result });

    setMapTitles((prev) =>
      produce(prev, (draftState) => {
        const placeNameArr = e.result.place_name.split(",");

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
  };

  useEffect(() => {
    geocoder.on("result", pantoEventLocation);
    return () => {
      geocoder.off("result", pantoEventLocation);
    };
  }, [map]);

  const switchOrientation = () => {
    orientationSwitcher(product, setProduct);
  };

  return (
    <div sx={styles.container}>
      {!isMobile && (
        <Text as="p" className="description" sx={styles.subHeading}>
          Zadejte lokalitu
        </Text>
      )}
      <div
        id="geocoder"
        class="geocoder"
        sx={styles.locationInput}
        style={{ marginTop: isMobile ? "0px" : "20px", marginBottom: "20px" }}
      ></div>

      <Text as="p" className="description" sx={styles.subHeading}>
        Orientace
      </Text>
      <div sx={styles.orientationWrap}>
        <div sx={styles.orientationShapeItems}>
          <div>
            <div
              sx={styles.highMock}
              onClick={switchOrientation}
              className={!isProductWide(product) && "active"}
            ></div>
          </div>
          <div>
            <div
              sx={styles.wideMock}
              onClick={switchOrientation}
              className={isProductWide(product) && "active"}
            ></div>
          </div>
        </div>
        <div sx={styles.textsItems}>
          <p
            onClick={switchOrientation}
            className={!isProductWide(product) && "active"}
          >
            Na výšku
          </p>

          <p
            onClick={switchOrientation}
            className={isProductWide(product) && "active"}
          >
            Na šířku
          </p>
        </div>
      </div>

      <Text as="p" className="description" sx={styles.topDescription}>
        <b>Tip!</b> Pro změnu naspisu a podnadpisu klikněte přímo na mapu
      </Text>

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
  subHeading: {
    fontWeight: 600,
    textAlign: "left",
    marginBottom: "20px",
  },

  topDescription: {
    margin: "30px 0px",
    fontWeight: 300,
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
    maxWidth: "324px",
    // boxShadow: "0 0 10px #fe6769",
    border: "2px solid",
    borderColor: "cta_color",
    borderRadius: "5px",
    "& div": {
      width: "100%",
      maxWidth: "100%",
    },
  },

  orientationWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  orientationShapeItems: {
    width: ["100%", "50%", "50%", "100%", "80%", "80%", "60%"],
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "> div": {
      width: "30%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "> div > div": {
      cursor: "pointer",
    },
    "> div > div.active": {
      border: "2px solid",
      borderColor: "cta_color",
      pointerEvents: "none",
      cursor: "default",
    },
  },
  highMock: {
    border: "1px solid black",
    height: "50px",
    width: "25px",
    backgroundColor: "white",
  },
  wideMock: {
    border: "1px solid black",
    height: "25px",
    width: "50px",
    backgroundColor: "white",
  },

  textsItems: {
    width: ["100%", "50%", "50%", "100%", "80%", "80%", "60%"],
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "> p": {
      my: 1,
      cursor: "pointer",
    },
    "> p.active": {
      color: "cta_color",
      pointerEvents: "none",
      cursor: "default",
    },
  },
};
