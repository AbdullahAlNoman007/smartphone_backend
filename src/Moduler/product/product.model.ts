import { Schema, model } from "mongoose";
import { Tproduct } from "./product.interface";

const productSchema = new Schema<Tproduct>({
    name: { type: String, required: true, unique: true },
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

export const productModel = model<Tproduct>('Product', productSchema);
