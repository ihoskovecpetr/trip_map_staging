import {
  LAYOUT_STYLE_NAMES,
  TITLES_FONT_DEFAULT,
  FAKE_DIV_IDS,
  DEFAULT_FONT_WEIGHT_BOLD,
} from "../constants/constants";

export function prepareTextInput({
  element,
  name,
  textSize,
  textValue = "",
  fontWeight = DEFAULT_FONT_WEIGHT_BOLD,
  padding,
  textAlign = "center",
  color = "black",
  onInput,
  height,
  width,
  layout,
}) {
  element.setAttribute("type", "text");
  element.setAttribute("name", name);
  element.setAttribute("contenteditable", "plaintext-only");
  element.setAttribute("maxLength", name === "subtitle" ? 44 : 30);
  element.setAttribute("id", "title_input");

  element.value = textValue;

  // element.addEventListener(
  //   "input",
  //   function (e) {
  //     console.log("Input_change_SAME", { 1: e.target.value, 2: textValue });
  //     onInput(e);
  //   },
  //   false
  // );

  element.onkeyup = (e) => {
    onInput(e);
  };

  let htmlLongSideLength;

  if (height > width) {
    htmlLongSideLength = height;
  } else {
    htmlLongSideLength = width;
  }
  let elementsToStyleArr = [element];

  const fakeTextElement = document.getElementById(FAKE_DIV_IDS[name]);
  if (fakeTextElement) {
    elementsToStyleArr.push(fakeTextElement);
  }

  elementsToStyleArr.map((el) => {
    Object.assign(el.style, {
      fontSize: `${0.003 * textSize * htmlLongSideLength}px`,
      fontFamily: TITLES_FONT_DEFAULT,
    });
  });

  Object.assign(element.style, {
    width: "100%",
    display: "inline-block",
    textAlign,
    fontSize: `${0.003 * textSize * htmlLongSideLength}px`,
    fontFamily: TITLES_FONT_DEFAULT,
    fontWeight: fontWeight,
    color,
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    position: "relative",
    // top: name === "heading" ? "5px" : 0,
    paddingLeft: padding + "px",

    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",

    display: layout === LAYOUT_STYLE_NAMES.PURE ? "none" : "block",
    WebkitBoxSizing: "border-box", // Safari/Chrome, other WebKit
    MozBoxSizing: "border-box", // Firefox, other Gecko
    BoxSizing: "border-box", // Opera/IE 8+
  });
}

module.exports = {
  prepareTextInput,
};
