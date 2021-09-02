const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fullStoreScehma = new Schema(
  {
    storeId: { type: String },
    product: {
      name: { type: String },
      price: { type: String },
      currency: { type: String },
      sizeObject: { type: Object },
      variantId: { type: Number },
      materialDesc: { type: String },
      shippingCode: { type: String },
      isLayoutColorSwitched: { type: Boolean },
      densityConstant: { type: Number },
    },
    mapTitles: {
      heading: { type: Object },
      subtitle: { type: Object },
    },
    activeLayoutName: { type: String },
    activeMapStyleName: { type: String },
    mapCoordinates: { type: Object },
    mapZoom: { type: Number },
    isHydrated: { type: Boolean },
    seenPopup: { type: Boolean },
    uploadPercentage: { type: Number },
    discount: { type: Object },
    journeys: { type: Object },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.fullStore || mongoose.model("fullStore", fullStoreScehma);
