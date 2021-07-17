export const getLayoutColors = ({ product, mapStyleObject }) => {
  if (!mapStyleObject.textColor || !mapStyleObject.layoutColor) {
    return { textLayoutColor: "#000000", fillLayoutColor: "#ffffff" };
  }
  console.log({ isLayoutColorSwitched: product.isLayoutColorSwitched });

  if (product.isLayoutColorSwitched) {
    console.log("1");
    return {
      textLayoutColor: `#${mapStyleObject.layoutColor}`,
      fillLayoutColor: `#${mapStyleObject.textColor}`,
    };
  }
  console.log("2");

  return {
    textLayoutColor: `#${mapStyleObject.textColor}`,
    fillLayoutColor: `#${mapStyleObject.layoutColor}`,
  };
};
