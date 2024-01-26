import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    const result = await userService.createUserIntoDB(req.body)
    sendRespone(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User is created",
        data: result
    })
})
const login = catchAsync(async (req, res) => {
    const result = await userService.loginIntoDB(req.body)
    sendRespone(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User is logged in",
        data: result
    })
})

export const userController = {
    createUser,
    login
}