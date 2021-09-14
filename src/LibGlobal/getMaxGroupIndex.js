export const getMaxGroupIndex = (journeys) => {
  const max = journeys.reduce((a, b) => {
    return Math.max(a, b.groupIndex);
  }, 0); // HERE

  return max;
};
