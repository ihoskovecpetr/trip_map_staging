import { FAKE_DIV_IDS } from "constants/constants";

const getSizeOfTitle = (mapTitles, htmlLongSideLength) => {
  const fakeHeading = document.getElementById(FAKE_DIV_IDS.heading);
  const fakeSubtitle = document.getElementById(FAKE_DIV_IDS.subtitle);

  const headingObject = mapTitles?.heading;
  const subtitleObject = mapTitles?.subtitle;

  if (!fakeHeading || !fakeSubtitle) {
    return 0;
  }

  const headingFontSize = headingObject.size;
  const subtitleFontSize = subtitleObject.size;

  console.log({ htmlLongSideLength });

  Object.assign(fakeHeading.style, {
    fontSize: `${0.003 * headingFontSize * htmlLongSideLength}px`,
  });

  Object.assign(fakeSubtitle.style, {
    fontSize: `${0.003 * subtitleFontSize * htmlLongSideLength}px`,
  });

  fakeHeading.innerText = headingObject?.text;
  fakeSubtitle.innerText = subtitleObject?.text;

  const sizes = [fakeHeading?.offsetWidth, fakeSubtitle?.offsetWidth];
  console.log({ sizes });
  return Math.max(...sizes);
};

module.exports = {
  getSizeOfTitle,
};
