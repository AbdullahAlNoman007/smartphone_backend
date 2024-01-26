import { Schema, model } from "mongoose";
import { Tbuy } from "./buying.interface";

const buyerSchema = new Schema<Tbuy>({
    quantity: { type: Number, required: true },
    buyerName: { type: String, required: true },
    saleDate: { type: Date, required: true }
})

export const buyModel = model<Tbuy>('booking', buyerSchema)