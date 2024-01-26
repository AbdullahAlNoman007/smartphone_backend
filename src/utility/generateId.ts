import { productModel } from "../Moduler/product/product.model"

const generateId = async () => {
    const products = await productModel.find({})
    const currentId = (Number(products.length) + 1).toString().padStart(4, '0')
    const realId = `P-${currentId}`
    return realId
}
export default generateId