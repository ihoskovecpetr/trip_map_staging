import React, { useRef } from "react";

export function useIsSafari() {
  function IsSafari() {
    if (typeof window == "undefined") {
      return false;
    }

    var isSafari =
      /constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(
        !window["safari"] ||
          (typeof safari !== "undefined" && safari.pushNotification)
      );

    return isSafari;
  }

  return IsSafari();
}
