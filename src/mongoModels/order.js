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

OrderScehma.index(
  { geometry: "2dsphere", name: "text", address: "text", description: "text" },
  { weights: { name: 2, address: 1, description: 1 } }
);

module.exports =
  mongoose.models.orders || mongoose.model("orders", OrderScehma);
