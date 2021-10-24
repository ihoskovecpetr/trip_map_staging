export const getMaxLocationIndex = (locations) => {
  console.log({ locations });
  const indexesArr = Object.values(locations).map(({ index }) => index);
  if (!indexesArr.length) {
    var maxLocationId = 0;
  } else {
    var maxLocationId = Math.max(...indexesArr);
  }
  return maxLocationId + 1;
};
