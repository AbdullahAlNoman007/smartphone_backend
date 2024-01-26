import { Tbuy } from "./buying.interface";
import { productModel } from "../product/product.model";
import mongoose from "mongoose";
import { buyModel } from "./buying.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { Tproduct } from "../product/product.interface";

const createBookingIntoDB = async (payload: Tbuy, id: string) => {

    const quantity = payload.quantity
    if (quantity === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "You give quantity zero.")
    }
    const date = new Date()
    payload.saleDate = date

    const product = await productModel.findById(id)
    const currentQuantity = product?.quantity as number
    if (currentQuantity <= 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "This product is Out of stock")
    }

    product!.quantity = product!.quantity - quantity

    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        const buy = await buyModel.create([payload], { session })
        if (!buy) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to sale record!")
        }

        const updateProduct = await productModel.findByIdAndUpdate(id, product as Tproduct, { new: true, upsert: true, session })
        if (!updateProduct) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to update the product's quantity!")
        }

        await session.commitTransaction()
        await session.endSession()
        return buy
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error(error)
    }
}

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {

    const { duration } = query

    let date = new Date();
    if (duration === 'daily') {
        date.setDate(date.getDate() - 1);
    }
    else if (duration === 'weekly') {
        date.setDate(date.getDate() - 7);
    }
    else if (duration === 'monthly') {
        date.setMonth(date.getMonth() - 1);
    }
    else if (duration === 'yearly') {
        date.setFullYear(date.getFullYear() - 1);
    }
    else {
        date = new Date("1972-01-26T00:00:00.0Z")
    }

    const result = await buyModel.find({ saleDate: { $gte: date } })
    return result
}

export const buyingService = {
    createBookingIntoDB,
    getAllBookingsFromDB
}