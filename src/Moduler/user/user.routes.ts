import express from 'express'
import validationRequest from '../../middleware/validationRequest'
import { userValidation } from './user.validation'
import { userController } from './user.controller'

const route = express.Router()

route.post('/create-user', validationRequest(userValidation.userValidationSchema), userController.createUser)
route.post('/login', validationRequest(userValidation.logInSchema), userController.login)

export const userRoutes = route