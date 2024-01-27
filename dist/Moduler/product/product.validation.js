"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        price: zod_1.z.number(),
        quantity: zod_1.z.number(),
        releaseDate: zod_1.z.string(),
        brand: zod_1.z.string(),
        model: zod_1.z.string(),
        operatingSystem: zod_1.z.enum(['andriod', 'iOS']),
        ram: zod_1.z.string(),
        waterResistance: zod_1.z.boolean(),
        storageCapacity: zod_1.z.string(),
        screenSize: zod_1.z.string(),
        cameraQuality: zod_1.z.string(),
        batteryLife: zod_1.z.string(),
    })
});
const productUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        quantity: zod_1.z.number().optional(),
        releaseDate: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
        model: zod_1.z.string().optional(),
        operatingSystem: zod_1.z.enum(['andriod', 'iOS']).optional(),
        ram: zod_1.z.string().optional(),
        waterResistance: zod_1.z.boolean().optional(),
        storageCapacity: zod_1.z.string().optional(),
        screenSize: zod_1.z.string().optional(),
        cameraQuality: zod_1.z.string().optional(),
        batteryLife: zod_1.z.string().optional(),
    })
});
const productDelete = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.array(zod_1.z.string())
    })
});
exports.productValidation = {
    productValidationSchema,
    productDelete,
    productUpdateSchema
};
