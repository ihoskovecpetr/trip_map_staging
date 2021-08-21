export const setDevicePixelRatio = (ratio) => {
  console.log("Setting_devicePixelRatio", ratio);
  Object.defineProperty(window, "devicePixelRatio", {
    get: function () {
      return ratio;
    },
  });
};
