export const setDevicePixelRatio = (ratio) => {
  console.log("NEW_devicePixelRatio", ratio);
  Object.defineProperty(window, "devicePixelRatio", {
    get: function () {
      return ratio;
    },
  });
};
