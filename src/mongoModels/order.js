const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderScehma = new Schema(
  {
    sessionId: { type: String },
    clientProductObj: { type: Object },
    imageObj: { type: Object },
    mapTitles: { type: Object },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.orders || mongoose.model("orders", OrderScehma);
