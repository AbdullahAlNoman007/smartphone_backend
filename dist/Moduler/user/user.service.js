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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const createToken_1 = require("../../utility/createToken");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.password !== payload.password) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password doesn't match!");
    }
    const hashPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.salt_round));
    const user = {
        name: payload.name,
        email: payload.email,
        password: hashPassword
    };
    const result = yield user_model_1.userModel.create(user);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
    }
    const respone = {
        name: payload.name,
        email: payload.email
    };
    return respone;
});
const loginIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findOne({ email: payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.OK, "User doesn't exists");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password doesn't match");
    }
    const jwtPayLoad = {
        id: (user._id).toString(),
        name: user.name,
        email: user.email
    };
    const token = (0, createToken_1.createToken)(jwtPayLoad, config_1.default.token_secret, '1d');
    if (!token) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Token');
    }
    const result = Object.assign({}, jwtPayLoad);
    return {
        result,
        token
    };
});
exports.userService = {
    createUserIntoDB,
    loginIntoDB
};
