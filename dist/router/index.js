"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_routes_1 = require("../Moduler/product/product.routes");
const user_routes_1 = require("../Moduler/user/user.routes");
const buying_route_1 = require("../Moduler/buying/buying.route");
const router = express_1.default.Router();
const moduleRouters = [
    {
        path: '/product',
        router: product_routes_1.productRoutes
    },
    {
        path: '/user',
        router: user_routes_1.userRoutes
    },
    {
        path: '/',
        router: buying_route_1.buyRoutes
    },
];
moduleRouters.map(route => router.use(route.path, route.router));
exports.default = router;
