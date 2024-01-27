"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyerValidation = void 0;
const zod_1 = require("zod");
const buyerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        quantity: zod_1.z.number(),
        buyerName: zod_1.z.string()
    })
});
exports.buyerValidation = {
    buyerValidationSchema
};
