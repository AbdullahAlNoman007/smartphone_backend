import { z } from "zod";

const productValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        releaseDate: z.string(),
        brand: z.string(),
        model: z.string(),
        operatingSystem: z.enum(['andriod', 'iOS']),
        ram: z.string(),
        waterResistance: z.boolean(),
        storageCapacity: z.string(),
        screenSize: z.string(),
        cameraQuality: z.string(),
        batteryLife: z.string(),
    })
})
const productUpdateSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        price: z.number().optional(),
        quantity: z.number().optional(),
        releaseDate: z.string().optional(),
        brand: z.string().optional(),
        model: z.string().optional(),
        operatingSystem: z.enum(['andriod', 'iOS']).optional(),
        ram: z.string().optional(),
        waterResistance: z.boolean().optional(),
        storageCapacity: z.string().optional(),
        screenSize: z.string().optional(),
        cameraQuality: z.string().optional(),
        batteryLife: z.string().optional(),
    })
})
const productDelete = z.object({
    body: z.object({
        id: z.array(z.string())
    })
})
export const productValidation = {
    productValidationSchema,
    productDelete,
    productUpdateSchema
}