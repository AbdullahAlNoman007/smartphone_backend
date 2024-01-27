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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSerivce = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.create(payload);
    return result;
});
const getAllProductFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.find({});
    return result;
});
const deleteProductFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.deleteMany({ _id: { $in: payload.id } });
    return result;
});
const updateProductFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.findByIdAndUpdate(id, payload);
    return result;
});
const getProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { price, releaseDate } = query;
    const date = new Date(releaseDate);
    const dateQuery = product_model_1.productModel.find({ releaseDate: date });
    const lowPrice = Number((price === null || price === void 0 ? void 0 : price.split("-")[0]) || 0);
    const highPrice = Number((price === null || price === void 0 ? void 0 : price.split("-")[1]) || 1000000000000000);
    const priceQuery = dateQuery.find({ price: { $gte: lowPrice, $lte: highPrice } });
    const phoneSearchFields = ['model', 'brand', 'name'];
    const queryObj = Object.assign({}, query);
    let searchTerm = '';
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query === null || query === void 0 ? void 0 : query.searchTerm;
    }
    const searchQuery = priceQuery.find({
        $or: phoneSearchFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' }
        }))
    });
    const excludeFields = ['searchTerm', 'price', 'name', 'releaseDate'];
    excludeFields.forEach(el => delete queryObj[el]);
    const filterQuery = yield searchQuery.find(queryObj);
    return filterQuery;
});
exports.productSerivce = {
    createProductIntoDB,
    getAllProductFromDB,
    deleteProductFromDB,
    updateProductFromDB,
    getProductFromDB
};
