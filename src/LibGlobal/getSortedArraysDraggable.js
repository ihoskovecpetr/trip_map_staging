export const getSortedArraysDraggable = (locationsDraggable) => {
  const journeys = Object.entries(locationsDraggable.trips).map(
    (column) => column[1].locationIds
  );

  const populatedJourneys = journeys.map((journey) => {
    return journey.map((locationName) => {
      return locationsDraggable.locations[locationName];
    });
  });

  return populatedJourneys;
};
