import httpStatus from "http-status";
import sendRespone from "../../utility/sendResponse";
import catchAsync from "../../utility/trycatch";
import { buyingService } from "./buying.service";

const createBooking = catchAsync(async (req, res) => {
    const result = await buyingService.createBookingIntoDB(req.body, req.params.id)

    sendRespone(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Product is bought",
        data: result
    })
})

const getAllBookings = catchAsync(async (req, res) => {
    const result = await buyingService.getAllBookingsFromDB(req.query)

    sendRespone(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Sales history is retrieved",
        data: result
    })
})

export const buyingController = {
    createBooking,
    getAllBookings
}