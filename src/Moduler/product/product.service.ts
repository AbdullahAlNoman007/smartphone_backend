import generateId from "../../utility/generateId";
import { Tproduct } from "./product.interface";
import { productModel } from "./product.model";

const createProductIntoDB = async (payload: Tproduct) => {
    payload.id = await generateId()
    const result = await productModel.create(payload)
    return result;
}

const getAllProductFromDB = async () => {
    const result = await productModel.find({})
    return result
}

export const productSerivce = {
    createProductIntoDB,
    getAllProductFromDB
}