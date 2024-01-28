import express from 'express'
import validationRequest from '../../middleware/validationRequest'
import { buyerValidation } from './buying.validation'
import { buyingController } from './buying.controller'
import auth from '../../middleware/auth'

const route = express.Router()

route.post('/buy/:id', auth(), validationRequest(buyerValidation.buyerValidationSchema), buyingController.createBooking)
route.get('/salehistory', auth(), buyingController.getAllBookings)

export const buyRoutes = route