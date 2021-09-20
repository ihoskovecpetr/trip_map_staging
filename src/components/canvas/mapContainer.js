/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Lightbox from "react-image-lightbox";
import Rotate90DegreesCcwIcon from "@material-ui/icons/Rotate90DegreesCcw";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactMapboxGl, { Layer, Feature, Source, Marker } from "react-mapbox-gl";
import Backdrop from "@material-ui/core/Backdrop";

import { useIsMobile } from "Hooks/useIsMobile";
import { color, fontWeight, fontSize } from "utils";
import BackdropLoader from "components/backdropLoader";

import iconChat from "assets/mapIcons/pin2D.svg";

import { useQualityImageCreator } from "Hooks/useQualityImageCreator";
import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";
import CustomTooltipWrap from "components/custom-tooltip";
import { getSortedArrays } from "LibGlobal/getSortedArrays";
import { getGeoArc } from "LibGlobal/getGeoArc";
import { getBbox } from "LibGlobal/getBbox";
import { getCenteringLayoutDimensions } from "LibGlobal/getCenteringLayoutDimensions";
import MapButtons from "./mapButtons";

import {
  setPopupSeenAction,
  updateJourneyPoint,
  setMapZoomAction,
  setMapCoordinatesAction,
  updateIcon,
} from "redux/order/actions";

import {
  useProductSelector,
  useActiveLayoutSelector,
  useActiveMapStyleSelector,
  useSeenPopupSelector,
  useMapCoordinatesSelector,
  useMapZoomSelector,
  useGetJourneys,
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

const Map = ReactMapboxGl({
  accessToken: NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN,
});

const Map2 = ReactMapboxGl({
  accessToken: NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN,
});

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
  const journeysRedux = useGetJourneys();
  const sortedGroupsJourneys = getSortedArrays(journeysRedux);
  const mapZoom = useMapZoomSelector();
  const mapCenterCoordinates = useMapCoordinatesSelector();
  const journeysSpecs = useGetJourneysSpecsSelector();
  const isJourneysEnabled = useJourneysEnabledSelector();
  const icons = useGetIcons();

  // const [bbox, setBbox] = useState(null);
  const [isCreatingImage, setIsCreatingImage] = useState(false);
  const [draggedPoint, setDraggedPoint] = useState();
  const [lightbox, setLightbox] = useState({
    open: false,
    activeSrc: null,
  });
  const [images, setImages] = useState([]);

  const { isMobile } = useIsMobile();
  const qualityImageCreator = useQualityImageCreator();

  const mapCanvas = map?.getCanvas();

  const { baseLongSize } = getCenteringLayoutDimensions({
    product: productRedux,
    layout: activeLayoutNameRedux,
    elWidth: mapCanvas?.width,
    elHeight: mapCanvas?.height,
  });

  const { dataPrintful } = useGetDataPrintful(
    VARIANTS_PRINTFUL.map((variant) => variant.id)
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    // setAnchorEl(anchorEl ? null : event.currentTarget);
    openTeaserImage();
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    localStorage.setItem("seenPopup", true);
    dispatch(setPopupSeenAction(true));
    e.stopPropagation();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const fullscreenImageRequested = async () => {
    setIsCreatingImage(true);
    console.log({ snapMapInstance });
    const finalImgSrc = await qualityImageCreator({
      map,
      snapMapInstance,
      activeLayoutName: activeLayoutNameRedux,
      product: productRedux,
      activeMapStyleName,
      mapTitles,
      options: {
        isPreview: false,
        isLowDefinition: false,
      },
    });

    setLightbox({
      open: true,
      activeSrc: finalImgSrc,
    });

    setIsCreatingImage(false);
    return;
  };

  const openTeaserImage = async () => {
    if (isCreatingImage) {
      return;
    }
    setOpenBackdrop(true);
    await fullscreenImageRequested();
    setOpenBackdrop(false);
  };

  const onMapLoad = (mapLoc) => {
    mapLoc.dragRotate.disable();
    mapLoc.touchZoomRotate.disableRotation();

    setMapInstance(mapLoc);
  };

  const onMapSnapshotLoad = (snapMap) => {
    snapMap.resize();
    setSnapMapInstance(snapMap);
  };

  const onUp = (currentPoint) => (e) => {
    const coords = e.lngLat;

    e.target.dragPan.enable();

    if (currentPoint.titleSourceId === draggedPoint) {
      dispatch(
        updateJourneyPoint({
          ...currentPoint,
          titleLocation: [coords.lng, coords.lat],
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
  }, [journeysRedux]);

  useEffect(() => {
    map?.resize();
    if (journeysRedux.length > 0) {
      // setBbox(getBbox(journeysRedux));
    }
  }, [journeysRedux]);

  useEffect(() => {
    setAnchorEl(
      !seenPopup ? document.getElementById("full_screen_button") : null
    );
  }, []);

  useEffect(() => {
    map?.resize();
  }, [isJourneysEnabled]);

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
          <Map
            onStyleLoad={onMapLoad}
            style={MAP_STYLES[activeMapStyleName].url}
            containerStyle={{
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
            center={mapCenterCoordinates}
            zoom={[mapZoom]}
            onZoomEnd={(_, e) => {
              dispatch(setMapZoomAction(e.target.getZoom()));
            }}
            onMoveEnd={(_, e) => {
              dispatch(
                setMapCoordinatesAction([
                  e.target.getCenter().lng,
                  e.target.getCenter().lat,
                ])
              );
            }}
            onMouseMove={(map, e) => {}}
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
              onError={(e) => {
                console.log("map_error_ ", { e });
              }}
              lineWidth={1}
              baseCircleRadius={3}
            />

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
            })}
          </Map>
        </div>
        <Backdrop open={false}>
          <NeverDisplayContainer id="snapshot_map_wrapper">
            <Map2
              onStyleLoad={onMapSnapshotLoad}
              style={MAP_STYLES[activeMapStyleName].url}
              containerStyle={{
                width: "100%",
                height: "100%",
              }}
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
              />
            </Map2>
          </NeverDisplayContainer>
        </Backdrop>

        {Object.keys(FAKE_DIV_IDS).map((key, index) => (
          <div
            id={FAKE_DIV_IDS[key]}
            contenteditable="plaintext-only"
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
}) => {
  return (
    <>
      {isJourneysEnabled &&
        sortedGroupsJourneys.map((group, groupIndex) => {
          return group.map((_, pointIndex) => {
            if (!sortedGroupsJourneys[groupIndex][pointIndex]) {
              return;
            }

            const previousPoint =
              sortedGroupsJourneys[groupIndex][pointIndex - 1];
            const currentPoint = sortedGroupsJourneys[groupIndex][pointIndex];

            return (
              <>
                <Layer
                  id={"point-blip" + groupIndex + pointIndex}
                  type="circle"
                  paint={{
                    "circle-radius": baseCircleRadius * 1.4,
                    "circle-radius-transition": { duration: 0 },
                    "circle-opacity-transition": { duration: 0 },
                    "circle-color":
                      MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName]
                        .colorSecondary,
                  }}
                >
                  <Feature coordinates={currentPoint.location} />
                </Layer>

                <Layer
                  id={"point" + groupIndex + pointIndex}
                  type="circle"
                  // sourceId={"point" + groupIndex + pointIndex}
                  paint={{
                    "circle-radius": baseCircleRadius,
                    "circle-color":
                      currentPoint.titleSourceId === draggedPoint
                        ? "red"
                        : MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName]
                            .colorMain,
                  }}
                >
                  <Feature coordinates={currentPoint.location} />
                </Layer>

                {previousPoint && (
                  <Layer
                    type="line"
                    layout={lineLayout}
                    paint={{
                      "line-color":
                        MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName]
                          .colorMain,
                      "line-width": lineWidth,
                    }}
                  >
                    <Feature
                      coordinates={getGeoArc(
                        currentPoint.location,
                        previousPoint.location
                      )}
                    />
                  </Layer>
                )}
                {currentPoint.titleLabelDisplayed && (
                  <Layer
                    type="symbol"
                    key={groupIndex + pointIndex}
                    layout={{
                      // "icon-image": "harbor-15",
                      "icon-allow-overlap": true,
                      "text-field": currentPoint.titleLabel,
                      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
                      "text-size": textSize, // 7,
                      "text-transform": "uppercase",
                      "text-letter-spacing": 0.05,
                      "text-offset": [0, -2],
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
                        MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName]
                          .colorHalo,
                      "text-halo-width": textSize,
                    }}
                    onMouseEnter={(e) => {
                      setCursor("move");
                    }}
                    onMouseLeave={() => {
                      setCursor("pointer");
                    }}
                  >
                    <Feature
                      coordinates={currentPoint.titleLocation}
                      onDragStart={(e) => {
                        e.target.dragPan.disable();
                        setDraggedPoint(currentPoint.titleSourceId);
                      }}
                      draggable={
                        !draggedPoint ||
                        currentPoint.titleSourceId === draggedPoint
                      }
                      onDragEnd={onUp(currentPoint)}
                    />
                  </Layer>
                )}
              </>
            );
          });
        })}
    </>
  );
};

const BNT_RADIUS = 4;

const LogoWrap = styled.div`
  position: absolute;
  display: flex;
`;

const EmptySpaceExpander = styled.div`
  flex-grow: 4;
`;

const PlaceToHideBigMap = styled.div`
  width: 0px;
  height: 0px;
  overflow: hidden;
`;

const ColorWrap = styled.div`
  color: ${color("cta_color")} !important;
  display: flex;
`;

const StyledImg = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
`;

const StyledRotateIcon = styled(Rotate90DegreesCcwIcon)`
  transform: rotate(-45deg);
`;

const StyledCircularProgress = styled(CircularProgress)`
  height: 24px !important;
  width: 24px !important;
  color: inherit !important;
`;

const StyledText = styled.p`
  color: ${color("cta_color")};
  font-weight: ${fontWeight("bold")};
  padding-left: 15px;
  margin: 0;
`;

const TooltipBodyWrap = styled.div`
  width: 300px;
  margin-top: 2px;
  background-color: rgba(220, 0, 78, 0.99);
  color: white;
  display: flex;

  padding: 5px;
  flex-direction: column;

  & p {
    font-size: ${fontSize("sm")};
  }
`;

const DummyBtn = styled.div`
  border: 1px solid lightGrey;
  display: inline-flex;
  padding: 3px;
  margin: 2px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  color: rgba(0, 0, 0, 0.8);
`;

const ImagesWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const NeverDisplayContainer = styled.div`
  position: absolute;
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
    pt: ["20px", null, null, 0],
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
  allBtnWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px",
  },
  zoomBtnWrapper: {
    display: "flex",
    padding: "auto",
    marginRight: "20px",
  },
  zoomBtn: {
    border: "1px solid lightGrey",
    display: "flex",
    padding: "5px 5px",
    margin: "auto",
    backgroundColor: "white",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    cursor: "pointer",

    "&.left": {
      borderRadius: `${BNT_RADIUS}px 0 0 ${BNT_RADIUS}px`,
      borderRight: "0px solid lightGrey",
    },
    "&.right": {
      borderRadius: `0 ${BNT_RADIUS}px ${BNT_RADIUS}px 0`,
    },
  },
  rotateBtn: {
    border: "1px solid lightGrey",
    display: "flex",
    padding: "5px 5px",
    m: "2px",
    borderRadius: `${BNT_RADIUS}px`,
    backgroundColor: "white",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    cursor: "pointer",
    // marginRight: "30px",
  },

  teaserBtn: {
    border: "1px solid lightGrey",
    display: "flex",
    padding: "5px 5px",
    m: "2px",
    borderRadius: `${BNT_RADIUS}px`,
    backgroundColor: "white",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    cursor: "pointer",
    // marginRight: "30px",
  },
};
