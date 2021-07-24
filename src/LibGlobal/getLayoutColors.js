export const getLayoutColors = ({ product, mapStyleObject }) => {
  if (!mapStyleObject.textColor || !mapStyleObject.layoutColor) {
    return { textLayoutColor: "#000000", fillLayoutColor: "#ffffff" };
  }

  if (product.isLayoutColorSwitched) {
    return {
      textLayoutColor: `#${mapStyleObject.layoutColor}`,
      fillLayoutColor: `#${mapStyleObject.textColor}`,
    };
  }

  return {
    textLayoutColor: `#${mapStyleObject.textColor}`,
    fillLayoutColor: `#${mapStyleObject.layoutColor}`,
  };
};
