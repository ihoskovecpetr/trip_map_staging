import * as turf from "@turf/turf";

const getBbox = (journeys) => {
  const locationsArray = Object.values(journeys?.locations).map(
    (journey) => journey.location
  );

  if (locationsArray.length < 2) {
    return [locationsArray[0], locationsArray[0]];
  }
  const line = turf.lineString(locationsArray);

  const bbox = turf.bbox(line);

  return [
    [bbox[0], bbox[1]],
    [bbox[2], bbox[3]],
  ];
};

module.exports = {
  getBbox,
};
