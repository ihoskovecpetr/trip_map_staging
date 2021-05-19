import { ContactsOutlined } from "@material-ui/icons";
import { LAYOUT_STYLE_NAMES, FONT_TITLES } from "../constants/constants";

export function prepareTextInput({
  element,
  name,
  textSize,
  textValue = "",
  defaultText = "Default Text",
  padding,
  textAlign = "center",
  color = "black",
  onClickFce,
  height,
  width,
  layout,
}) {
  element.setAttribute("type", "text");
  element.setAttribute("name", name);
  element.setAttribute("placeholder", null);

  if (textValue === false) {
    element.setAttribute("placeholder", defaultText ?? "default Text");
  }
  if (textValue !== false) {
    element.setAttribute("value", textValue);
    element.setAttribute("placeholder", "");
  }
  element.addEventListener(
    "input",
    function (e) {
      onClickFce(e);
    },
    false
  );

  let baseLngSide;

  if (height > width) {
    baseLngSide = height;
  } else {
    baseLngSide = width;
  }

  Object.assign(element.style, {
    width: "100%",
    // height: `${0.003 * textSize * baseLngSide}px`,
    textAlign,
    fontSize: `${0.003 * textSize * baseLngSide}px`,
    fontFamily: FONT_TITLES,
    color,
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    paddingLeft: padding + "px",
    // textTransform: "uppercase",
    display: layout === LAYOUT_STYLE_NAMES.PURE ? "none" : "block",
    WebkitBoxSizing: "border-box", // Safari/Chrome, other WebKit
    MozBoxSizing: "border-box", // Firefox, other Gecko
    BoxSizing: "border-box", // Opera/IE 8+
  });
}

module.exports = {
  prepareTextInput,
};
