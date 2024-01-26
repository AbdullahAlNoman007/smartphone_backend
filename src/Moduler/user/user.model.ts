import { Schema, model } from "mongoose";
import { Tuser } from "./user.interface";

const userSchema = new Schema<Tuser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export const userModel = model<Tuser>('user', userSchema)