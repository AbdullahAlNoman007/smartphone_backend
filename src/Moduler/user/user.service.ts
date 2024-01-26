import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { Tlogin, TpayloadUser, Tuser } from "./user.interface";
import { userModel } from "./user.model";
import bcrypt from 'bcrypt'
import config from "../../config";
import { createToken } from "../../utility/createToken";

const createUserIntoDB = async (payload: TpayloadUser) => {

    if (payload.password !== payload.password) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't match!")
    }

    const hashPassword = await bcrypt.hash(payload.password, Number(config.salt_round))

    const user = {
        name: payload.name,
        email: payload.email,
        password: hashPassword
    }

    const result = await userModel.create(user)

    if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user")
    }

    const respone = {
        name: payload.name,
        email: payload.email
    }

    return respone
}

const loginIntoDB = async (payload: Tlogin) => {
    const user = await userModel.findOne({ email: payload.email })
    if (!user) {
        throw new AppError(httpStatus.OK, "User doesn't exists")
    }

    const isPasswordMatch = await bcrypt.compare(payload.password, user.password)
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't match")
    }

    const jwtPayLoad = {
        id: (user._id).toString(),
        name: user.name,
        email: user.email
    }
    const token = createToken(jwtPayLoad, config.token_secret as string, '1d')
    if (!token) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Token');
    }

    const result = { ...jwtPayLoad }
    return {
        result,
        token
    }
}

export const userService = {
    createUserIntoDB,
    loginIntoDB
}