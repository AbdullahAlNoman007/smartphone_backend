import { z } from "zod";

const buyerValidationSchema = z.object({
    body: z.object({
        quantity: z.number(),
        buyerName: z.string()
    })
})

export const buyerValidation = {
    buyerValidationSchema
}