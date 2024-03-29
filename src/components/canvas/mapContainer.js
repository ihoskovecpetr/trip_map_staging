/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { jsx } from 'theme-ui'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Lightbox from 'react-image-lightbox'
import ReactMapboxGl, { Layer, Feature, Source, Marker } from 'react-mapbox-gl'
import Backdrop from '@material-ui/core/Backdrop'

import { mobile } from 'utils'
import { useScreenSize } from 'Hooks/useScreenSize'
import { getBbox } from 'LibGlobal/getBbox'
import iconChat from 'assets/mapIcons/pin2D.svg'
import { useElementDimensions } from 'Hooks/useElementDimensions'
import { getSortedArraysDraggable } from 'LibGlobal/getSortedArraysDraggable'
import { getGeoArc } from 'LibGlobal/getGeoArc'
import RoadMapLines from 'components/RoadMapLines'
import { getCenteringLayoutDimensions } from 'LibGlobal/getCenteringLayoutDimensions'
import MapButtons from './mapButtons'

import {
    setMapZoomAction,
    setMapCoordinatesAction,
    updateIcon,
    updateLocation,
    setMapBboxAction
} from 'redux/order/actions'

import {
    useProductSelector,
    useActiveLayoutSelector,
    useActiveMapStyleSelector,
    useSeenPopupSelector,
    useMapCoordinatesSelector,
    useMapZoomSelector,
    useMapBboxSelector,
    useGetJourneysDraggableSelector,
    useGetJourneysSpecsSelector,
    useJourneysEnabledSelector,
    useGetIcons
} from 'redux/order/reducer'

import {
    FAKE_DIV_IDS,
    TITLES_DEFAULT,
    VARIANTS_PRINTFUL,
    MAP_STYLES,
    MAP_STYLED_AND_FLIGHT_COLOR,
    LABEL_SIZE_KOEF,
    MODE_OF_TRANSPORT
} from 'constants/constants'

const NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN =
    'pk.eyJ1IjoiaWhvc2tvdmVjcGV0ciIsImEiOiJja3g1dmtqdXYwZHY3MnBxbzkycW5veGF5In0.e_D0Bd6v_28G4cIJJn65EA'

const Map = ReactMapboxGl({
    accessToken: NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN,
    maxZoom: 10 // avoiding file size over 12MB
})

const MapPrint = ReactMapboxGl({
    accessToken: NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN
})

const lineLayout = {
    'line-cap': 'round',
    'line-join': 'round'
}

export default function MapContainer({
    map,
    snapMapInstance,
    addZoom,
    subtractZoom,
    mapTitles,
    setMapInstance,
    setSnapMapInstance
}) {
    const dispatch = useDispatch()
    const productRedux = useProductSelector()
    const activeLayoutNameRedux = useActiveLayoutSelector()
    const activeMapStyleName = useActiveMapStyleSelector()
    const journeysDragable = useGetJourneysDraggableSelector()
    const sortedGroupsJourneys = getSortedArraysDraggable(journeysDragable)
    const mapZoom = useMapZoomSelector()
    const mapBbox = useMapBboxSelector()
    const mapCenterCoordinates = useMapCoordinatesSelector()
    const journeysSpecs = useGetJourneysSpecsSelector()
    const isJourneysEnabled = useJourneysEnabledSelector()
    const { height: screenHeight } = useScreenSize()
    const [draggedPoint, setDraggedPoint] = useState()
    const [lightbox, setLightbox] = useState({
        open: false,
        activeSrc: null
    })
    const [images, setImages] = useState([])

    const { height: headerHeight } = useElementDimensions('header')
    const { height: bannerHeight } = useElementDimensions('discountBanner')
    const { height: mapButtonsHeight } = useElementDimensions('map_buttons_wrapper')

    const mapCanvas = map?.getCanvas()

    const { baseLongSize } = getCenteringLayoutDimensions({
        product: productRedux,
        layout: activeLayoutNameRedux,
        elWidth: mapCanvas?.width,
        elHeight: mapCanvas?.height
    })

    const onMapLoad = mapLoc => {
        mapLoc.dragRotate.disable()
        mapLoc.touchZoomRotate.disableRotation()

        setMapInstance(mapLoc)
    }

    const onMapSnapshotLoad = snapMap => {
        snapMap.resize()
        setSnapMapInstance(snapMap)
    }

    const onUp = currentPoint => e => {
        const coords = e.lngLat

        e.target.dragPan.enable()

        if (currentPoint.titleSourceId === draggedPoint) {
            dispatch(
                updateLocation({
                    ...currentPoint,
                    titleLocation: [coords.lng, coords.lat]
                })
            )
            setDraggedPoint(null)
        }
    }

    const setCursor = newCursorStyle => {
        const canvas = map.getCanvas()
        Object.assign(canvas.style, {
            cursor: newCursorStyle
        })
    }

    const updateIconLocation = (e, originalIconObj) => {
        const coords = e.lngLat

        dispatch(updateIcon({ ...originalIconObj, location: [coords.lng, coords.lat] }))
    }

    // useEffect(() => {
    //     const image = new Image(100, 100)
    //     image.src = iconChat

    //     setImages(['myImage', image])
    // }, [journeysDragable])

    useEffect(() => {
        map?.resize() // in order to apply route changes to map
    }, [journeysDragable])

    useEffect(() => {
        if (map && mapZoom) {
            // map.fitBounds(mapBbox)
            map.setCenter(mapCenterCoordinates)
            map.setZoom(mapZoom)
        } else if (map && Object.values(journeysDragable.locations).length > 0) {
            const locationsNoDummy = getLocationsWithoutDummy(journeysDragable.locations)
            map.fitBounds(getBbox({ locations: locationsNoDummy }), { padding: 60 })
        }
    }, [map])

    const getLocationsWithoutDummy = locations => {
        const keysArr = Object.keys(locations)
        const newestLocationKey = keysArr[keysArr.length - 1]

        if (locations[newestLocationKey].title === 'Paris, Tour Eiffel') {
            let { [newestLocationKey]: _, ...rest } = locations

            return rest
        } else {
            return locations
        }
    }

    useEffect(() => {
        map?.resize()
    }, [isJourneysEnabled])

    const getMapStyleObj = (mapId, isSnapshot) => ({
        version: 8,
        sources: {
            osm: {
                type: 'raster',
                tiles: [
                    `https://api.mapbox.com/styles/v1/ihoskovecpetr/${mapId}/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN}`
                ],
                tileSize: isSnapshot ? 128 : 64, //128 64
                minzoom: 0,
                maxzoom: 22
            }
        },
        options: {
            diff: false
        },
        layers: [
            {
                id: 'osmTiles',
                type: 'raster',
                source: 'osm',
                minzoom: 0,
                maxzoom: 22
            }
        ],
        glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf'
        // glyphs: "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
    })

    return (
        <StudioMapSection id="map_studio_segment">
            <MapButtons
                map={map}
                snapMapInstance={snapMapInstance}
                addZoom={addZoom}
                subtractZoom={subtractZoom}
                mapTitles={mapTitles}
            />

            <MapAvailableSpace
                id="map_available_space_id"
                screenHeight={screenHeight}
                headerHeight={headerHeight}
                bannerHeight={bannerHeight}
                mapButtonsHeight={mapButtonsHeight}
            >
                <div style={{ display: 'none' }} id="map_wrap_id">
                    <Map
                        onStyleLoad={onMapLoad}
                        // style={MAP_STYLES[activeMapStyleName].url}
                        style={getMapStyleObj(MAP_STYLES[activeMapStyleName].mapId)}
                        containerStyle={{
                            width: '100%',
                            height: '100%',
                            overflow: 'visible'
                        }}
                        center={mapCenterCoordinates}
                        // zoom={[mapZoom]}
                        // fitBounds={mapBbox}
                        onZoomEnd={(_, e) => {
                            dispatch(setMapZoomAction(e.target.getZoom()))
                        }}
                        onMoveEnd={(_, e) => {
                            dispatch(setMapCoordinatesAction([e.target.getCenter().lng, e.target.getCenter().lat]))
                            dispatch(
                                setMapBboxAction([
                                    [e.target.getBounds()._sw.lng, e.target.getBounds()._sw.lat],
                                    [e.target.getBounds()._ne.lng, e.target.getBounds()._ne.lat]
                                ])
                            )
                        }}
                        onError={(map, e) => {
                            console.log({ Map_errror: e, map })
                        }}
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
                            textSize={baseLongSize ? (baseLongSize * LABEL_SIZE_KOEF) / 2 : 10}
                            onError={e => {
                                console.log('map_error_ ', { e })
                            }}
                            lineWidth={1}
                            baseCircleRadius={2}
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
                    </Map>
                </div>
                <Backdrop open={false}>
                    <NeverDisplayContainer id="snapshot_map_wrapper">
                        <MapPrint
                            onStyleLoad={onMapSnapshotLoad}
                            style={getMapStyleObj(MAP_STYLES[activeMapStyleName].mapId, true)}
                            containerStyle={{
                                width: '100%',
                                height: '100%'
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
                                baseCircleRadius={4}
                            />
                        </MapPrint>
                    </NeverDisplayContainer>
                </Backdrop>

                {Object.keys(FAKE_DIV_IDS).map((key, index) => (
                    <div
                        id={FAKE_DIV_IDS[key]}
                        key={index}
                        contenteditable="plaintext-only"
                        style={{
                            width: 'auto',
                            display: 'inline-block',
                            visibility: 'hidden',
                            position: 'fixed',
                            overflow: 'auto',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {TITLES_DEFAULT[index]}
                    </div>
                ))}
            </MapAvailableSpace>

            <canvas id="canvas_merging" sx={styles.canvas_merging} />
            {lightbox.open && (
                <Lightbox mainSrc={lightbox.activeSrc} onCloseRequest={() => setLightbox({ open: false })} />
            )}
        </StudioMapSection>
    )
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
    baseCircleRadius
}) => {
    return (
        <>
            {isJourneysEnabled &&
                sortedGroupsJourneys.map((group, groupIndex) => {
                    return group.map((_, pointIndex) => {
                        if (!sortedGroupsJourneys[groupIndex][pointIndex]) {
                            return
                        }

                        const previousPoint = sortedGroupsJourneys[groupIndex][pointIndex - 1]
                        const currentPoint = sortedGroupsJourneys[groupIndex][pointIndex]
                        return (
                            <>
                                {previousPoint && (
                                    <>
                                        {currentPoint.modeOfTransport === MODE_OF_TRANSPORT.flying && (
                                            <Layer
                                                type="line"
                                                layout={lineLayout}
                                                key={`${pointIndex}_2_${groupIndex}`}
                                                paint={{
                                                    'line-color':
                                                        MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName].colorPath,
                                                    'line-width': lineWidth
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
                                        {[MODE_OF_TRANSPORT.driving, MODE_OF_TRANSPORT.walking].includes(
                                            currentPoint.modeOfTransport
                                        ) && (
                                            <RoadMapLines
                                                lineWidth={lineWidth}
                                                currentPoint={currentPoint}
                                                previousPoint={previousPoint}
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )
                    })
                })}
            {isJourneysEnabled &&
                sortedGroupsJourneys.map((group, groupIndex) => {
                    return group.map((_, pointIndex) => {
                        if (!sortedGroupsJourneys[groupIndex][pointIndex]) {
                            return
                        }

                        const currentPoint = sortedGroupsJourneys[groupIndex][pointIndex]

                        return (
                            // <span key={`${pointIndex}_X_${groupIndex}`}>
                            <>
                                <Layer
                                    id={'point-blip' + groupIndex + pointIndex}
                                    key={`${pointIndex}_${groupIndex}`}
                                    type="circle"
                                    paint={{
                                        'circle-radius': baseCircleRadius * 1.2,
                                        'circle-radius-transition': { duration: 0 },
                                        'circle-opacity-transition': { duration: 0 },
                                        'circle-color': MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName].colorOuterCircle
                                    }}
                                >
                                    <Feature coordinates={currentPoint.location} />
                                </Layer>

                                <Layer
                                    id={'point' + groupIndex + pointIndex}
                                    type="circle"
                                    key={`${pointIndex}_1_${groupIndex}`}
                                    // sourceId={"point" + groupIndex + pointIndex}
                                    paint={{
                                        'circle-radius': baseCircleRadius,
                                        'circle-color':
                                            currentPoint.titleSourceId === draggedPoint
                                                ? 'red'
                                                : MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName].colorInnerCircle
                                    }}
                                >
                                    <Feature coordinates={currentPoint.location} />
                                </Layer>

                                {currentPoint.titleLabelDisplayed && (
                                    <Layer
                                        type="symbol"
                                        key={`${pointIndex}_3_${groupIndex}`}
                                        layout={{
                                            // "icon-image": "harbor-15",
                                            // "icon-allow-overlap": true,
                                            'text-field': currentPoint.titleLabel,
                                            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                                            'text-size': textSize, // 7,
                                            'text-transform': 'uppercase',
                                            'text-letter-spacing': 0.05,
                                            'text-anchor': 'bottom-right',
                                            // "text-translate": [0, 10],
                                            // "text-translate-anchor": "map",
                                            'text-padding': 10,
                                            // "text-line-height": 1.5,
                                            'text-offset': [-1, 0],
                                            // anchor: ["top-right"],
                                            // "text-radial-offset": 10,
                                            'text-allow-overlap': true,
                                            'text-ignore-placement': true
                                        }}
                                        paint={{
                                            'text-color': MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName].colorText,
                                            'text-halo-color':
                                                currentPoint.titleSourceId === draggedPoint
                                                    ? 'red'
                                                    : MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName].colorHalo,
                                            'text-halo-width': textSize
                                        }}
                                        onMouseEnter={e => {
                                            setCursor('move')
                                        }}
                                        onMouseLeave={() => {
                                            setCursor('pointer')
                                        }}
                                    >
                                        <Feature
                                            coordinates={currentPoint.titleLocation}
                                            onDragStart={e => {
                                                e.target.dragPan.disable()

                                                setDraggedPoint(currentPoint.titleSourceId)
                                            }}
                                            draggable={!draggedPoint || currentPoint.titleSourceId === draggedPoint}
                                            onDragEnd={onUp(currentPoint)}
                                        />
                                    </Layer>
                                )}
                            </>
                        )
                    })
                })}
        </>
    )
}

const BNT_RADIUS = 4

const NeverDisplayContainer = styled.div`
    position: absolute;
`

const StudioMapSection = styled.div`
    display: flex;
    flex-direction: column;
    transform: translateX(0);
    height: 100%;
    // overflow: hidden; //auto,
`

const MapAvailableSpace = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: flex-start;
    height: ${({ screenHeight, mapButtonsHeight }) => `calc(${screenHeight}px - ${mapButtonsHeight}px)`};
    padding-top: 14px;

    ${mobile`
    height: ${({ screenHeight, headerHeight, bannerHeight, mapButtonsHeight }) =>
        `calc(${screenHeight}px - ${headerHeight}px - ${bannerHeight}px - ${mapButtonsHeight}px)`};
    align-Items: center;
    padding-top: 0;

  `}
`

const styles = {
    map_available_space: {
        width: '100%',
        height: ['60vh', null, null, '85vh']
    },

    canvas_merging: {
        display: 'none'
    }
}
