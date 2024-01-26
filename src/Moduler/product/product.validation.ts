import { z } from "zod";

const productValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        releaseDate: z.string(),
        brand: z.string(),
        model: z.string(),
        operatingSystem: z.string(),
        ram: z.string(),
        waterResistance: z.boolean(),
        storageCapacity: z.string(),
        screenSize: z.string(),
        cameraQuality: z.string(),
        batteryLife: z.string(),
    })
})
export const productValidation = {
    productValidationSchema
}