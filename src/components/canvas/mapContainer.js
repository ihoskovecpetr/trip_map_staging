/** @jsx jsx */
import React, { useEffect, useState, useCallback } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Lightbox from "react-image-lightbox";
// import ReactMapboxGl, { Layer, Feature, Source, Marker } from "react-mapbox-gl";
import ReactMapGL, { Layer, Source, Marker } from "react-map-gl";

import Backdrop from "@material-ui/core/Backdrop";

import { useIsMobile } from "Hooks/useIsMobile";
import BackdropLoader from "components/backdropLoader";

import iconChat from "assets/mapIcons/pin2D.svg";

import { useQualityImageCreator } from "Hooks/useQualityImageCreator";
import { getSortedArraysDraggable } from "LibGlobal/getSortedArraysDraggable";
import { getGeoArc } from "LibGlobal/getGeoArc";
import { getBbox } from "LibGlobal/getBbox";
import { getCenteringLayoutDimensions } from "LibGlobal/getCenteringLayoutDimensions";
import MapButtons from "./mapButtons";
import Pin from "./pin";

import {
  setPopupSeenAction,
  updateJourneyPoint,
  setMapZoomAction,
  setMapCoordinatesAction,
  setMapPositionAction,
  updateIcon,
  updateLocation,
} from "redux/order/actions";

import {
  useProductSelector,
  useActiveLayoutSelector,
  useActiveMapStyleSelector,
  useSeenPopupSelector,
  //remove
  useMapCoordinatesSelector,
  useMapZoomSelector,
  //to here
  useMapPosition,
  useGetJourneysDraggable,
  useGetJourneysSpecsSelector,
  useJourneysEnabledSelector,
  useGetIcons,
} from "redux/order/reducer";

import {
  FAKE_DIV_IDS,
  TITLES_DEFAULT,
  VARIANTS_PRINTFUL,
  MAP_STYLES,
  MAP_STYLED_AND_FLIGHT_COLOR,
  LABEL_SIZE_KOEF,
} from "constants/constants";

const NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN =
  "pk.eyJ1IjoicGV0cmhvc2tvdmVjIiwiYSI6ImNrcGE3YjlxZzBuYnQydnQ3OTVyNm03emMifQ.qEEhTuzVLQ9kdw8qI3jl0w";

// const Map = ReactMapboxGl({
//   accessToken: NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN,
// });

// const Map2 = ReactMapboxGl({
//   accessToken: NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN,
// });

const lineLayout = {
  "line-cap": "round",
  "line-join": "round",
};

export default function MapContainer({
  map,
  snapMapInstance,
  addZoom,
  subtractZoom,
  mapTitles,
  setMapInstance,
  setSnapMapInstance,
}) {
  const dispatch = useDispatch();
  const productRedux = useProductSelector();
  const activeLayoutNameRedux = useActiveLayoutSelector();
  const activeMapStyleName = useActiveMapStyleSelector();
  const seenPopup = useSeenPopupSelector();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const journeysDragable = useGetJourneysDraggable();
  const sortedGroupsJourneys = getSortedArraysDraggable(journeysDragable);

  const mapZoom = useMapZoomSelector();
  const mapCenterCoordinates = useMapCoordinatesSelector();
  const mapPosition = useMapPosition();
  const journeysSpecs = useGetJourneysSpecsSelector();
  const isJourneysEnabled = useJourneysEnabledSelector();
  const icons = useGetIcons();

  const [isCreatingImage, setIsCreatingImage] = useState(false);
  const [draggedPoint, setDraggedPoint] = useState();
  const [lightbox, setLightbox] = useState({
    open: false,
    activeSrc: null,
  });
  const [images, setImages] = useState([]);
  const qualityImageCreator = useQualityImageCreator();

  const [viewport, setViewport] = useState(mapPosition);
  const mapCanvas = map?.getCanvas();

  const { baseLongSize } = getCenteringLayoutDimensions({
    product: productRedux,
    layout: activeLayoutNameRedux,
    elWidth: mapCanvas?.width,
    elHeight: mapCanvas?.height,
  });

  const updateMapDimensions = (newDimensions) => {
    dispatch(setMapPositionAction(newDimensions));
  };

  // const fullscreenImageRequested = async () => {
  //   setIsCreatingImage(true);
  //   const finalImgSrc = await qualityImageCreator({
  //     map,
  //     snapMapInstance,
  //     activeLayoutName: activeLayoutNameRedux,
  //     product: productRedux,
  //     activeMapStyleName,
  //     mapTitles,
  //     options: {
  //       isPreview: false,
  //       isLowDefinition: false,
  //     },
  //   });

  //   setLightbox({
  //     open: true,
  //     activeSrc: finalImgSrc,
  //   });

  //   setIsCreatingImage(false);
  //   return;
  // };

  const onMapLoad = (e) => {
    const mapLoc = e.target;
    mapLoc.dragRotate.disable();
    mapLoc.touchZoomRotate.disableRotation();

    console.log({ mapLoc });

    setMapInstance(mapLoc);
  };

  const onMapSnapshotLoad = (e) => {
    const snapMap = e.target;
    snapMap.resize();
    setSnapMapInstance(snapMap);
  };

  const onUp = (currentPoint) => (e) => {
    const coords = e.lngLat;

    map.dragPan.enable();
    map.scrollZoom.enable();

    if (currentPoint.titleSourceId === draggedPoint) {
      dispatch(
        updateLocation({
          ...currentPoint,
          titleLocation: [coords[0], coords[1]],
        })
      );
      setDraggedPoint(null);
    }
  };

  const setCursor = (newCursorStyle) => {
    const canvas = map.getCanvas();
    Object.assign(canvas.style, {
      cursor: newCursorStyle,
    });
  };

  const updateIconLocation = (e, originalIconObj) => {
    const coords = e.lngLat;

    dispatch(
      updateIcon({ ...originalIconObj, location: [coords.lng, coords.lat] })
    );
  };

  useEffect(() => {
    const image = new Image(100, 100);
    image.src = iconChat;

    setImages(["myImage", image]);
  }, [journeysDragable]);

  useEffect(() => {
    map?.resize();
    if (map && Object.values(journeysDragable.locations).length > 0) {
      // map.fitBounds(getBbox(journeysDragable), { padding: 80 });
    }
  }, [journeysDragable]);

  useEffect(() => {
    map?.resize();
  }, [isJourneysEnabled]);

  const getMapStyleObj = (mapId) => ({
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: [
          `https://api.mapbox.com/styles/v1/petrhoskovec/${mapId}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGV0cmhvc2tvdmVjIiwiYSI6ImNrcGE3YjlxZzBuYnQydnQ3OTVyNm03emMifQ.qEEhTuzVLQ9kdw8qI3jl0w`,
        ],
        tileSize: 64,
        minzoom: 0,
        maxzoom: 22,
      },
    },
    options: {
      diff: false,
    },
    layers: [
      {
        id: "osmTiles",
        type: "raster",
        source: "osm",
        minzoom: 0,
        maxzoom: 22,
      },
    ],
    // glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    glyphs: "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
    // glyphs: "",
  });

  return (
    <div sx={styles.canvas_bg} id="map_studio_segment">
      <MapButtons
        map={map}
        snapMapInstance={snapMapInstance}
        addZoom={addZoom}
        subtractZoom={subtractZoom}
        mapTitles={mapTitles}
      />

      <div sx={styles.map_available_space} id="map_available_space_id">
        <div style={{ display: "none" }} id="map_wrap_id">
          <ReactMapGL
            mapboxApiAccessToken={NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN}
            {...viewport}
            mapStyle={getMapStyleObj(MAP_STYLES[activeMapStyleName].mapId)}
            // mapStyle={MAP_STYLES[activeMapStyleName].url}
            onLoad={onMapLoad}
            width="100%"
            height="100%"
            onViewportChange={(nextViewport) => {
              setViewport(nextViewport);

              updateMapDimensions(nextViewport);
            }}
            onError={(E) => {
              console.log({ Err_or: E });
            }}

            // onStyleLoad={onMapLoad}
            // // style={MAP_STYLES[activeMapStyleName].url}
            // style={style}
            // containerStyle={{
            //   width: "100%",
            //   height: "100%",
            //   overflow: "visible",
            // }}
            // center={mapCenterCoordinates}
            // zoom={[mapZoom]}
            // onZoomEnd={(_, e) => {
            //   dispatch(setMapZoomAction(e.target.getZoom()));
            // }}
            // onMoveEnd={(_, e) => {
            //   dispatch(
            //     setMapCoordinatesAction([
            //       e.target.getCenter().lng,
            //       e.target.getCenter().lat,
            //     ])
            //   );
            // }}
            // onMouseMove={(map, e) => {}}
          >
            <PrintLocations
              map={map}
              sortedGroupsJourneys={sortedGroupsJourneys}
              isJourneysEnabled={isJourneysEnabled}
              draggedPoint={draggedPoint}
              setDraggedPoint={setDraggedPoint}
              activeMapStyleName={activeMapStyleName}
              onUp={onUp}
              setCursor={setCursor}
              textSize={
                baseLongSize ? (baseLongSize * LABEL_SIZE_KOEF) / 2 : 10
              }
              lineWidth={1}
              baseCircleRadius={3}
              isScreenshotPrint={false}
            />
            {/* 
            {icons?.map((icon) => {
              return (
                <Layer
                  id={icon.sourceId}
                  type="symbol"
                  layout={{ "icon-image": "myImage", "icon-size": 0.25 }}
                  images={images}
                  onMouseEnter={(e) => {
                    setCursor("move");
                  }}
                  onMouseLeave={() => {
                    setCursor("pointer");
                  }}
                >
                  <Feature
                    coordinates={icon.location}
                    draggable
                    onDragStart={(e) => {
                      console.log("Dragging_e", { e });
                    }}
                    onDragEnd={(e) => {
                      console.log("Dragging__ended_e", { e });
                      updateIconLocation(e, icon);
                    }}
                  />
                </Layer>
              );
            })} */}
          </ReactMapGL>
        </div>

        <Backdrop open={false}>
          <NeverDisplayContainer id="snapshot_map_wrapper">
            <ReactMapGL
              mapboxApiAccessToken={NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN}
              {...viewport}
              mapStyle={getMapStyleObj(MAP_STYLES[activeMapStyleName].mapId)}
              // mapStyle={MAP_STYLES[activeMapStyleName].url}

              onLoad={onMapSnapshotLoad}
              width="100%"
              height="100%"
            >
              <PrintLocations
                map={map}
                sortedGroupsJourneys={sortedGroupsJourneys}
                isJourneysEnabled={isJourneysEnabled}
                draggedPoint={draggedPoint}
                setCursor={setCursor}
                setDraggedPoint={setDraggedPoint}
                activeMapStyleName={activeMapStyleName}
                onUp={onUp}
                textSize={journeysSpecs.labelSizePrint}
                lineWidth={2}
                baseCircleRadius={5}
                isScreenshotPrint={true}
              />
            </ReactMapGL>
          </NeverDisplayContainer>
        </Backdrop>

        {Object.keys(FAKE_DIV_IDS).map((key, index) => (
          <div
            id={FAKE_DIV_IDS[key]}
            key={index}
            style={{
              width: "auto",
              display: "inline-block",
              visibility: "hidden",
              position: "fixed",
              overflow: "auto",
              "white-space": "nowrap",
            }}
          >
            {TITLES_DEFAULT[index]}
          </div>
        ))}
      </div>

      <canvas id="canvas_merging" sx={styles.canvas_merging} />
      {lightbox.open && (
        <Lightbox
          mainSrc={lightbox.activeSrc}
          onCloseRequest={() => setLightbox({ open: false })}
        />
      )}

      {openBackdrop && <BackdropLoader defaultState={true} />}
    </div>
  );
}

const PrintLocations = ({
  map,
  sortedGroupsJourneys,
  isJourneysEnabled,
  draggedPoint,
  setDraggedPoint,
  setCursor,
  activeMapStyleName,
  onUp,
  textSize,
  lineWidth,
  baseCircleRadius,
  isScreenshotPrint,
}) => {
  return (
    <>
      {map &&
        isJourneysEnabled &&
        sortedGroupsJourneys.map((group, groupIndex) => {
          return group.map((_, pointIndex) => {
            if (!sortedGroupsJourneys[groupIndex][pointIndex]) {
              return;
            }

            const previousPoint =
              sortedGroupsJourneys[groupIndex][pointIndex - 1];
            const currentPoint = sortedGroupsJourneys[groupIndex][pointIndex];

            const getGeojsonPoint = (location) => {
              return {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: location,
                    },
                  },
                ],
              };
            };

            const getGeojsonLine = (location) => {
              return {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "LineString",
                      coordinates: location,
                    },
                  },
                ],
              };
            };

            return (
              <>
                <Marker
                  key={"marker_" + groupIndex + pointIndex}
                  latitude={currentPoint.titleLocation[1]}
                  longitude={currentPoint.titleLocation[0]}
                  // offsetLeft={-20}
                  // offsetTop={-10}
                  draggable
                  onDragStart={(e) => {
                    console.log("DragStart:_", { e });
                    map.dragPan.disable();
                    map.scrollZoom.disable();
                    setDraggedPoint(currentPoint.titleSourceId);
                  }}
                  onMouseOver={() => {
                    console.log("Mouse_Over");
                  }}
                  // draggable={
                  //   !draggedPoint || currentPoint.titleSourceId === draggedPoint
                  // }
                  onDragEnd={onUp(currentPoint)}
                >
                  <StyledMapTitleLabel
                    textSize={textSize}
                    bgColor={
                      currentPoint.titleSourceId === draggedPoint
                        ? "red"
                        : MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName]
                            .colorHalo
                    }
                    textColor={
                      MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName]
                        .colorSecondary
                    }
                  >
                    {currentPoint.titleLabel}
                  </StyledMapTitleLabel>
                </Marker>
                <Source
                  id={"source_" + groupIndex + "_" + pointIndex}
                  key={"source_" + groupIndex + "_" + pointIndex}
                  type="geojson"
                  data={getGeojsonPoint(currentPoint.location)}
                />
                <Layer
                  id={"point-blip" + groupIndex + pointIndex}
                  key={"source_key_" + groupIndex + "_" + pointIndex}
                  source={"source_" + groupIndex + "_" + pointIndex}
                  type="circle"
                  paint={{
                    "circle-radius": baseCircleRadius * 1.4,
                    "circle-radius-transition": { duration: 0 },
                    "circle-opacity-transition": { duration: 0 },
                    "circle-color":
                      MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName]
                        .colorSecondary,
                  }}
                />

                <Source
                  id={"source_2_" + groupIndex + pointIndex}
                  key={"source_2_X_" + groupIndex + pointIndex}
                  type="geojson"
                  data={getGeojsonPoint(currentPoint.location)}
                />

                <Layer
                  id={"point" + groupIndex + pointIndex}
                  type="circle"
                  key={"layer_2_Y_" + groupIndex + pointIndex}
                  source={"source_2_" + groupIndex + pointIndex}
                  paint={{
                    "circle-radius": baseCircleRadius,
                    "circle-color":
                      currentPoint.titleSourceId === draggedPoint
                        ? "red"
                        : MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName]
                            .colorMain,
                  }}
                />

                {previousPoint && (
                  <>
                    <Source
                      id={"source_line_" + groupIndex + pointIndex}
                      key={"source_line_" + groupIndex + pointIndex}
                      type="geojson"
                      data={getGeojsonLine(
                        getGeoArc(currentPoint.location, previousPoint.location)
                      )}
                    />

                    <Layer
                      key={"layout_line_" + groupIndex + pointIndex}
                      source={"source_line_" + groupIndex + pointIndex}
                      type="line"
                      layout={lineLayout}
                      paint={{
                        "line-color":
                          MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName]
                            .colorMain,
                        "line-width": lineWidth,
                      }}
                    />
                  </>
                )}
                {/* {isScreenshotPrint && ( */}
                <>
                  <Source
                    id={"source_title_" + groupIndex + pointIndex}
                    key={"source_title_" + groupIndex + pointIndex}
                    type="geojson"
                    data={getGeojsonPoint(currentPoint.titleLocation)}
                  />
                  <Layer
                    id={"layer_title_" + groupIndex + pointIndex}
                    source={"source_title_" + groupIndex + pointIndex}
                    type="symbol"
                    layout={{
                      // "icon-image": "harbor-15",
                      "text-field": currentPoint.titleLabel,
                      "text-font": ["Open Sans Bold"],
                      "text-max-width": 15,
                      "text-size": textSize, // 7,
                      "text-transform": "uppercase",
                      "text-letter-spacing": 0.05,
                      // "text-offset": [4, -2],
                      "text-anchor": "top-left",
                      // "text-radial-offset": 10,
                      "text-allow-overlap": true,
                      "icon-allow-overlap": true,
                      "text-ignore-placement": true,
                      "icon-ignore-placement": true,
                    }}
                    paint={{
                      "text-color":
                        MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName]
                          .colorSecondary,
                      "text-halo-color":
                        currentPoint.titleSourceId === draggedPoint
                          ? "red"
                          : MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName]
                              .colorHalo,
                      "text-halo-width": textSize,
                    }}
                  />
                </>
                {/* )} */}
              </>
            );
          });
        })}
    </>
  );
};

const BNT_RADIUS = 4;

const NeverDisplayContainer = styled.div`
  position: absolute;
`;

const StyledMapTitleLabel = styled.div`
  cursor: move;
  background: ${({ bgColor }) => bgColor ?? "black"};
  color: ${({ textColor }) => textColor ?? "white"};
  padding: 1px 1px;
  line-height: 1;
  text-transform: uppercase;
  font-family: "Open_Sans_bold";
  font-size: ${({ textSize }) => textSize ?? 8}px;
  letter-spacing: 1.2;
`;

const styles = {
  canvas_bg: {
    px: "0 !important",
    display: "flex",
    flexDirection: "column",
    transform: "translateX(0)", // this is important, reset absolute position to thos element
    height: [null, null, null, "100%"],
    overflow: "auto", //"auto",
  },
  map_available_space: {
    display: "flex",
    justifyContent: "center",
    alignItems: ["flex-start", null, null, "center"],
    pt: ["14px", null, null, 0],
    width: "100%",
    height: ["60vh", null, null, "85vh"],
  },

  map_wrap_1: {
    position: "relative",
    overflow: "initial", //"initial",
    width: "100%",
    height: "100%",
  },
  canvas_merging: {
    display: "none",
  },
};
