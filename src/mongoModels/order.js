const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderScehma = new Schema(
  {
    sessionId: { type: String },
    clientProductObj: { type: Object },
    imageObj: { type: Object },

    payer_name: { type: String },
    payer_address: { type: String },
    payer_zip_code: { type: String },
    payer_email: { type: String },
    delivery_address_obj: { type: Object },
    delivery_name: { type: String },
    delivery_address: { type: String },
    delivery_zip_code: { type: String },
    map_url: { type: String },
    map_image_obj: { type: Object },
    map_width: { type: Number },
    map_height: { type: Number },
    price: { type: Number },
    idempotencyKey: { type: String },
    order_state: { type: String },
  },
  { timestamps: true }
);

OrderScehma.index(
  { geometry: "2dsphere", name: "text", address: "text", description: "text" },
  { weights: { name: 2, address: 1, description: 1 } }
);

module.exports =
  mongoose.models.orders || mongoose.model("orders", OrderScehma);
