import httpStatus from "http-status"
import AppError from "../Error/AppError"
import catchAsync from "../utility/trycatch"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config"
import { userModel } from "../Moduler/user/user.model"

const auth = () => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You do not have the necessary permissions to access this resource.")
        }
        const decoded = jwt.verify(token, config.token_secret as string) as JwtPayload

        const { id } = decoded

        const isUserExists = await userModel.findById(id)
        if (!isUserExists) {
            throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exists!")
        }

        req.user = decoded as JwtPayload
        next()
    })
}

export default auth
