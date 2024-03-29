const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fullStoreSchema = new Schema(
    {
        storeId: { type: String },
        product: {
            name: { type: String },
            price: { type: String },
            sizeObject: { type: Object },
            variantId: { type: Number },
            materialDesc: { type: String },
            shippingCode: { type: String },
            isLayoutColorSwitched: { type: Boolean },
            densityConstant: { type: Number }
        },
        mapTitles: {
            heading: { type: Object },
            subtitle: { type: Object }
        },
        activeLayoutName: { type: String },
        activeMapStyleName: { type: String },
        mapCenterCoordinates: { type: Object },
        mapZoom: { type: Number },
        mapBbox: { type: Array },
        activeStepNumber: { type: Number },
        seenPopup: { type: Boolean },
        uploadPercentage: { type: Number },
        discount: { type: Object },
        journeys: { type: Object },
        journeysSpecs: { type: Object },
        icons: { type: Object },
        journeysDraggable: { type: Object },
        locale: { type: String },
        defaultLocale: { type: String },
        currency: { type: String },
        deliveryRegion: { type: String }
    },
    { timestamps: true }
)

module.exports = mongoose.models.fullStore || mongoose.model('fullStore', fullStoreSchema)
