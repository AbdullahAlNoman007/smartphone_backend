"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyModel = void 0;
const mongoose_1 = require("mongoose");
const buyerSchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    buyerName: { type: String, required: true },
    saleDate: { type: Date, required: true }
});
exports.buyModel = (0, mongoose_1.model)('booking', buyerSchema);
