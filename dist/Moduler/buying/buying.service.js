"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyingService = void 0;
const product_model_1 = require("../product/product.model");
const mongoose_1 = __importDefault(require("mongoose"));
const buying_model_1 = require("./buying.model");
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createBookingIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const quantity = payload.quantity;
    if (quantity === 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You give quantity zero.");
    }
    const date = new Date();
    payload.saleDate = date;
    const product = yield product_model_1.productModel.findById(id);
    const currentQuantity = product === null || product === void 0 ? void 0 : product.quantity;
    console.log(product);
    if (currentQuantity <= 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This product is Out of stock");
    }
    product.quantity = product.quantity - quantity;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const buy = yield buying_model_1.buyModel.create([payload], { session });
        if (!buy) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to sale record!");
        }
        const updateProduct = yield product_model_1.productModel.findByIdAndUpdate(id, product, { new: true, upsert: true, session });
        if (!updateProduct) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update the product's quantity!");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return buy;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const getAllBookingsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { duration } = query;
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
        date = new Date("1972-01-26T00:00:00.0Z");
    }
    const result = yield buying_model_1.buyModel.find({ saleDate: { $gte: date } });
    return result;
});
exports.buyingService = {
    createBookingIntoDB,
    getAllBookingsFromDB
};
