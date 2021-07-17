import { css } from "styled-components";

const mediaQuery = (name) => (...styles) => {
  return css`
    @media (min-width: ${({ theme }) => theme.breakPoints[name]}) {
      ${css(...styles)}
    }
  `;
};

const getThemeFragment = (key) => (value) => ({ theme }) => {
  const availableValues = Object.keys(theme[key]);

  if (!availableValues.includes(value)) {
    throw new Error(
      `Invalid theme.${key} property '${value}'. Available values:` +
        `\n - ${availableValues.join("\n - ")}`
    );
  }

  return theme[key][value];
};

export const onlyTabletDevice = (...styles) => {
  return css`
    @media (min-width: ${({ theme }) =>
        theme.breakPoints.tabletLarge}) and (min-height: ${({ theme }) =>
        theme.breakPoints.tablet}) {
      ${css(...styles)}
    }
  `;
};

export const wideScreen = mediaQuery("wideScreen");

export const desktop = mediaQuery("desktop");

export const mobile = mediaQuery("mobile");

export const prop = (targetProp) => (props) => props[targetProp];

export const font = getThemeFragment("fonts");

export const fontWeight = getThemeFragment("fontWeights");

export const fontSize = getThemeFragment("fontSizes");

export const color = getThemeFragment("colors");

export const lineHeight = getThemeFragment("lineHeights");

export const hyphenate = (string, regex = /\s/g) => string.replace(regex, "-");

export const hashParamsBrandId = (location) =>
  window.btoa(
    JSON.stringify({
      location,
    })
  );
