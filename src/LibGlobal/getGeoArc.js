import * as turf from "@turf/turf";

const getGeoArc = (start, end) => {
  const feature = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [start, end],
    },
  };

  const lineDistance = turf.length(feature);
  const arc = [];
  const steps = 100;

  for (let i = 0; i < lineDistance; i += lineDistance / steps) {
    const segment = turf.along(feature, i);
    arc.push(segment.geometry.coordinates);
  }

  if (arc.length && arc[1][0] < -180) {
    arc[0] = [arc[0][0] - 360, arc[0][1]];
  }

  if (arc.length && arc[1][0] > 180) {
    arc[0] = [arc[0][0] + 360, arc[0][1]];
  }

  arc.push(end);

  return arc;
};

module.exports = {
  getGeoArc,
};
