import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { productSerivce } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
    const result = await productSerivce.createProductIntoDB(req.body)
    sendRespone(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Product is Created Successfully",
        data: result
    })
})
const getAllProduct = catchAsync(async (req, res) => {
    const result = await productSerivce.getAllProductFromDB()
    sendRespone(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Products is retrieved Successfully",
        data: result
    })
})


export const productController = {
    createProduct,
    getAllProduct
}