"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    operatingSystem: { type: String, enum: ['andriod', 'iOS'], required: true },
    ram: { type: String, required: true },
    waterResistance: { type: Boolean, required: true },
    storageCapacity: { type: String, required: true },
    screenSize: { type: String, required: true },
    cameraQuality: { type: String, required: true },
    batteryLife: { type: String, required: true },
});
exports.productModel = (0, mongoose_1.model)('Product', productSchema);
