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
exports.buyingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const trycatch_1 = __importDefault(require("../../utility/trycatch"));
const buying_service_1 = require("./buying.service");
const createBooking = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield buying_service_1.buyingService.createBookingIntoDB(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Product is bought",
        data: result
    });
}));
const getAllBookings = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield buying_service_1.buyingService.getAllBookingsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Sales history is retrieved",
        data: result
    });
}));
exports.buyingController = {
    createBooking,
    getAllBookings
};
