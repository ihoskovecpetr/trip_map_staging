import {
  LAYOUT_STYLE_NAMES,
  TITLES_FONT_DEFAULT,
  FAKE_DIV_IDS,
} from "../constants/constants";

export function prepareTextInput({
  element,
  name,
  textSize,
  textValue = "",
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

  element.addEventListener(
    "input",
    function (e) {
      onInput(e);
    },
    false
  );

  let baseLngSide;

  if (height > width) {
    baseLngSide = height;
  } else {
    baseLngSide = width;
  }
  let elementsToStyleArr = [element];

  const fakeElement = document.getElementById(FAKE_DIV_IDS[name]);
  if (fakeElement) {
    elementsToStyleArr.push(fakeElement);
  }

  elementsToStyleArr.map((el) => {
    Object.assign(el.style, {
      fontSize: `${0.003 * textSize * baseLngSide}px`,
      fontFamily: TITLES_FONT_DEFAULT,
    });
  });

  Object.assign(element.style, {
    width: "100%",
    display: "inline-block",
    textAlign,
    fontSize: `${0.003 * textSize * baseLngSide}px`,
    fontFamily: TITLES_FONT_DEFAULT,
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
