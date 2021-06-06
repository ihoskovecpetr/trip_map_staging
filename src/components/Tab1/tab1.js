/** @jsx jsx */
import { useEffect, useState } from "react";
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

export default function Tab1({
  map,
  setMapCoordinates,
  nextTab,
  setMapTitles,
  product,
  setProduct,
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

  const isProductWide = (product) => {
    if (product.sizeObject.ratio < 1) {
      return true;
    }
    return false;
  };

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
  };

  const switchOrientation = () => {
    orientationSwitcher(product, setProduct);
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
        style={{ marginTop: isMobile ? "0px" : "20px", marginBottom: "20px" }}
      ></div>

      <Text as="p" className="description" sx={styles.headingDesc}>
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
  headingDesc: {
    fontWeight: 500,
    textAlign: "left",
    color: "grey",
    margin: "20px 0",
  },

  orientationWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
  },
  orientationShapeItems: {
    width: ["100%", "60%", "60%", "100%", "80%", "80%", "60%"],
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
      boxShadow: "0 0 5px rgba(0,0,0,0.2)",
    },
    "> div > div.active": {
      border: "2px solid",
      borderColor: "cta_color",
      pointerEvents: "none",
      cursor: "default",
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
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
    width: ["100%", "60%", "60%", "100%", "80%", "80%", "60%"],
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
