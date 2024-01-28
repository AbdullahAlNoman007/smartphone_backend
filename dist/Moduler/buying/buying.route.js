"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const buying_validation_1 = require("./buying.validation");
const buying_controller_1 = require("./buying.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const route = express_1.default.Router();
route.post('/buy/:id', (0, auth_1.default)(), (0, validationRequest_1.default)(buying_validation_1.buyerValidation.buyerValidationSchema), buying_controller_1.buyingController.createBooking);
route.get('/salehistory', (0, auth_1.default)(), buying_controller_1.buyingController.getAllBookings);
exports.buyRoutes = route;
