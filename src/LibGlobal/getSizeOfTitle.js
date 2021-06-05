import { FAKE_DIV_IDS } from "../constants/constants";

const getSizeOfTitle = (heading, subtitle) => {
  const fakeHeading = document.getElementById(FAKE_DIV_IDS.heading);
  const fakeSubtitle = document.getElementById(FAKE_DIV_IDS.subtitle);

  console.log({ fakeHeading, fakeSubtitle, heading, subtitle });

  if (!fakeHeading || !fakeSubtitle) {
    return 0;
  }

  fakeHeading.innerText = heading;
  fakeSubtitle.innerText = subtitle;

  const sizes = [fakeHeading?.offsetWidth, fakeSubtitle?.offsetWidth];
  console.log({ sizes, max: Math.max(...sizes) });
  return Math.max(...sizes);
};

module.exports = {
  getSizeOfTitle,
};
