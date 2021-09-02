/** @jsx jsx */
import { useEffect, useState, useRef } from "react";
import { jsx } from "theme-ui";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import * as turf from "@turf/turf";
import { v4 as uuidv4 } from "uuid";

import { color } from "utils";
import { useGetJourneys } from "redux/order/reducer";
import { useIsMobile } from "Hooks/useIsMobile";
import GeocoderInput from "components/GeocoderInput";
import { getMaxGroupIndex } from "LibGlobal/getMaxGroupIndex";
import { getSortedArrays } from "LibGlobal/getSortedArrays";

import {
  addNewJourney,
  updateJourney,
  removeJourneyPoint,
} from "redux/order/actions";

const getPointData = ({ title, location }) => {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: location,
        },
        properties: {
          dummy_text: title,
        },
      },
    ],
  };
};

const mouseDownCallback = (map, point) => (e) => {
  console.log("mousedown_event");
  e.preventDefault();

  const canvas = map.getCanvasContainer();
  canvas.style.cursor = "grab";

  map.on("mousemove", onMove(map, point));
  map.once("mouseup", onUp(map, point));
};

const touchStartCallback = (map, point) => (e) => {
  console.log("touchstart_event");
  if (e.points.length !== 1) {
    return;
  }
  e.preventDefault();

  map.on("touchmove", onMove(map, point));
  map.once("touchend", onUp(map, point));
};

const onMove = (map, point) => (e) => {
  const coords = e.lngLat;
  const canvas = map.getCanvasContainer();

  canvas.style.cursor = "grabbing";

  const geoJsonData = getPointData({
    title: point.title,
    location: [coords.lng, coords.lat],
  });

  map.getSource(point.titleSourceId).setData(geoJsonData);
};

const onUp = (map, point) => (e) => {
  console.log("onUp");
  const coords = e.lngLat;

  const canvas = map.getCanvasContainer();
  canvas.style.cursor = "";

  console.log("Removing_event_listeners");

  map.off("mousedown", point.titleSourceId, mouseDownCallback(map, point));
  map.off("touchstart", point.titleSourceId, touchStartCallback(map, point));

  map.off("mousemove", onMove(map, point));
  map.off("touchmove", onMove(map, point));

  // updatePoint({
  //   ...point,
  //   titleLocation: [coords.lng, coords.lat],
  // });
};

const addDragableText = ({ map, currentPoint, updatePoint }) => {
  const { title, titleLocation, titleSourceId } = currentPoint;
  const canvas = map?.getCanvasContainer();

  if (!map) {
    return;
  }

  map.addSource(titleSourceId, {
    type: "geojson",
    data: getPointData({
      title: title,
      location: titleLocation,
    }),
  });
  map.addLayer({
    id: titleSourceId,
    type: "symbol",
    source: titleSourceId,
    layout: {
      "text-field": title, //`Map. {dummy_text}`,
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
      "text-allow-overlap": true,
      "icon-allow-overlap": true,
      "text-ignore-placement": true,
      "icon-ignore-placement": true,
      "text-anchor": "top",
      "text-offset": [0, 1],
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": "#000000",
      "text-halo-width": 5,
    },
  });

  console.log("Adding_event_listeners");

  map.on("mousedown", titleSourceId, mouseDownCallback(map, currentPoint));
  map.on("touchstart", titleSourceId, touchStartCallback(map, currentPoint));
};

const addLayerToMap = ({ map, layerId, sourceId }) => {
  map?.addLayer({
    id: layerId,
    type: "circle",
    source: sourceId,
    paint: {
      "circle-radius": 2,
      "circle-color": "white",
    },
  });
};

const drawRouteOrPoint = ({
  map,
  pointPrev,
  currentPoint,
  routeSourceId,
  routeLayerId,
  dispatch,
}) => {
  if (pointPrev) {
    const routePath = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [pointPrev.location, currentPoint.location],
          },
        },
      ],
    };

    const lineDistance = turf.length(routePath.features[0]);
    const arc = [];
    const steps = 100;

    for (let i = 0; i < lineDistance; i += lineDistance / steps) {
      const segment = turf.along(routePath.features[0], i);
      arc.push(segment.geometry.coordinates);
    }

    if (arc.length && arc[1][0] < -180) {
      arc[0] = [arc[0][0] - 360, arc[0][1]];
    }

    if (arc.length && arc[1][0] > 180) {
      arc[0] = [arc[0][0] + 360, arc[0][1]];
    }

    // Update the route with calculated arc coordinates
    routePath.features[0].geometry.coordinates = [...arc];

    map.addSource(routeSourceId, {
      type: "geojson",
      data: routePath,
    });

    map.addLayer({
      id: routeLayerId,
      source: routeSourceId,
      type: "line",
      paint: {
        "line-width": 1,
        "line-color": "#000000",
      },
    });
  }

  addDragableText({
    map,
    currentPoint,
    updatePoint: (newPoint) => {
      dispatch(updateJourney(newPoint));
    },
  });

  const sourceId2 = currentPoint.sourceId;

  map?.addSource(sourceId2, {
    type: "geojson",
    data: getPointData({ title: "Any", location: currentPoint.location }),
  });

  addLayerToMap({ map, layerId: sourceId2, sourceId: sourceId2 });
};

const removePointIfExists = (map, layerId, sourceId) => {
  const mapLayer = map?.getLayer(layerId);

  if (typeof mapLayer !== "undefined") {
    // Remove map layer & source.

    map.removeLayer(layerId);
  }

  const mapSource = map?.getSource(sourceId);

  if (typeof mapSource !== "undefined") {
    map.removeSource(sourceId);
  }
};

const getRouteSourceId = (previousPoint, currentPoint) => {
  return "ROUTE_" + previousPoint.sourceId + "_" + currentPoint.sourceId;
};

const removeAllPoints = (sortedGroupsJourneys, map) => {
  sortedGroupsJourneys.map((group, groupIndex) => {
    group.map((_, pointIndex) => {
      if (!sortedGroupsJourneys[groupIndex][pointIndex]) {
        return;
      }

      const previousPoint = sortedGroupsJourneys[groupIndex][pointIndex - 1];
      const currentPoint = sortedGroupsJourneys[groupIndex][pointIndex];

      removePointIfExists(map, currentPoint.sourceId, currentPoint.sourceId);
      removePointIfExists(
        map,
        currentPoint.titleSourceId,
        currentPoint.titleSourceId
      );

      if (previousPoint) {
        const routeSourceId = getRouteSourceId(previousPoint, currentPoint);

        removePointIfExists(map, routeSourceId, routeSourceId);
      }
    });
  });
};

export default function StepAddRoute({ map }) {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const router = useRouter();
  const journeysRedux = useGetJourneys();
  const journeysRef = useRef();
  const [currentGroup, setCurrentGroup] = useState(0);
  const currentGroupRef = useRef(currentGroup);

  const drawAllRoutes = () => {
    const sortedGroupsJourneys = getSortedArrays(journeysRedux);

    removeAllPoints(sortedGroupsJourneys, map);

    sortedGroupsJourneys.map((group, groupIndex) => {
      group.map((_, pointIndex) => {
        if (!sortedGroupsJourneys[groupIndex][pointIndex]) {
          return;
        }

        const previousPoint = sortedGroupsJourneys[groupIndex][pointIndex - 1];
        const currentPoint = sortedGroupsJourneys[groupIndex][pointIndex];

        if (previousPoint) {
          const routeSourceId = getRouteSourceId(previousPoint, currentPoint);

          drawRouteOrPoint({
            map,
            pointPrev: previousPoint,
            currentPoint: currentPoint,
            routeSourceId,
            routeLayerId: routeSourceId,
            dispatch,
          });
        } else {
          drawRouteOrPoint({
            map,
            currentPoint: currentPoint,
            dispatch,
          });
        }
      });
    });

    console.log("map_after_print::", { map, layers: map?.getStyle().layers });
  };

  useEffect(() => {
    currentGroupRef.current = currentGroup;
  }, [currentGroup]);

  useEffect(() => {
    map?.on("error", function (e) {
      console.log({ ErrorMap: e });
    });

    map?.on("load", function () {
      console.log("drawAllRoutes_1_eff_load");

      drawAllRoutes();
    });
  }, [map]);

  useEffect(() => {
    journeysRef.current = journeysRedux;

    const maxGroupIndex = getMaxGroupIndex(journeysRedux ?? []);
    setCurrentGroup(maxGroupIndex);

    if (!map) {
      return;
    }
    console.log("drawAllRoutes_1_eff");
    drawAllRoutes();
  }, [journeysRedux]);

  const setGeocoderResult = (groupIndex, e) => {
    const sourceId = "SourceId_" + Math.random();
    const titleSourceId = "TitleSourceId_" + Math.random();
    const placeNameArr = e.result.place_name.split(",");
    const newTitle = placeNameArr[0];

    dispatch(
      addNewJourney({
        index: journeysRedux.length,
        groupIndex: groupIndex,
        location: e.result.geometry.coordinates,
        sourceId: sourceId,
        title: newTitle,
        titleLocation: e.result.geometry.coordinates,
        titleSourceId,
      })
    );
  };

  const removePointRedux = (journeyPoint) => {
    const sortedGroupsJourneys = getSortedArrays(journeysRedux);

    removeAllPoints(sortedGroupsJourneys, map);

    dispatch(removeJourneyPoint(journeyPoint));
  };

  const sortedGroupsJourneys = getSortedArrays(journeysRedux);

  return (
    <Container>
      {!isMobile && <HeadingText>1B. Zadej lety</HeadingText>}
      <ul>
        {sortedGroupsJourneys.map((journeyGroup) => {
          return journeyGroup.map((journeyPoint, index) => {
            return (
              <>
                {index === 0 && (
                  <span>groupIndex: {journeyPoint.groupIndex}</span>
                )}
                {/* <GeocoderInput
                key={journey.sourceId}
                id={journey.sourceId}
                map={map}
                value={journey.title}
                setResult={setGeocoderResult(0)}
              /> */}
                <li>{journeyPoint.title}</li>
                <button
                  onClick={() => {
                    removePointRedux(journeyPoint);
                  }}
                >
                  REMOVE
                </button>
              </>
            );
          });
        })}
      </ul>
      <p>++ group {currentGroup}</p>
      <GeocoderInput
        id="new_input_1"
        map={map}
        setResult={(e) => setGeocoderResult(currentGroupRef.current, e)}
      />

      <button
        onClick={() => {
          setCurrentGroup((prev) => prev + 1);
        }}
      >
        +1 group
      </button>

      {/* <p>++ group {maxGroupIndex + 1}</p>
      <GeocoderInput
        id="new_input_2"
        map={map}
        setResult={setGeocoderResult(maxGroupIndex + 1)}
      /> */}
    </Container>
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

const Container = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;
