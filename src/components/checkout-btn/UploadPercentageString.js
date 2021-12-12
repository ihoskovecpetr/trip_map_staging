import React from "react";
import { useUploadPercentageSelector } from "redux/order/reducer";

export default function UploadPercentageString() {
  const uploadPercentage = useUploadPercentageSelector();

  return `${uploadPercentage}`;
}
