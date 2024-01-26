import { Tproduct } from "./product.interface";
import { productModel } from "./product.model";

const createProductIntoDB = async (payload: Tproduct) => {
    const result = await productModel.create(payload)
    return result;
}

const getAllProductFromDB = async () => {
    const result = await productModel.find({})
    return result
}
const deleteProductFromDB = async (payload: { id: string[] }) => {
    const result = await productModel.deleteMany({ _id: { $in: payload.id } })
    return result
}
const updateProductFromDB = async (id: string, payload: Partial<Tproduct>) => {
    const result = await productModel.findByIdAndUpdate(id, payload)
    return result
}
const getProductFromDB = async (query: Record<string, unknown>) => {

    const { price } = query


    const lowPrice = Number((price as string)?.split("-")[0] || 0)
    const highPrice = Number((price as string)?.split("-")[1] || 1000000000000000)

    const priceQuery = productModel.find({ price: { $gte: lowPrice, $lte: highPrice } })

    const phoneSearchFields = ['model', 'brand', 'name']
    const queryObj = { ...query }

    let searchTerm = ''
    if (query?.searchTerm) {
        searchTerm = query?.searchTerm as string
    }

    const searchQuery = priceQuery.find({
        $or: phoneSearchFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' }
        }))
    })

    const excludeFields = ['searchTerm', 'price']
    excludeFields.forEach(el => delete queryObj[el])

    const filterQuery = await searchQuery.find(queryObj)

    return filterQuery


}

export const productSerivce = {
    createProductIntoDB,
    getAllProductFromDB,
    deleteProductFromDB,
    updateProductFromDB,
    getProductFromDB
}