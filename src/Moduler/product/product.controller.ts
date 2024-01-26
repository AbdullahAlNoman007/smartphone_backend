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
const deleteProduct = catchAsync(async (req, res) => {
    console.log(req.body);
    const result = await productSerivce.deleteProductFromDB(req.body)
    sendRespone(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Product is deleted Successfully",
        data: result
    })
})
const updateProduct = catchAsync(async (req, res) => {
    const result = await productSerivce.updateProductFromDB(req.params.id, req.body)
    sendRespone(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Product is updated Successfully",
        data: result
    })
})
const getProduct = catchAsync(async (req, res) => {
    const result = await productSerivce.getProductFromDB(req.query)
    sendRespone(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Product is retrieved Successfully",
        data: result
    })
})


export const productController = {
    createProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
    getProduct
}