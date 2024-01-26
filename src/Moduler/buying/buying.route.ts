import express from 'express'
import validationRequest from '../../middleware/validationRequest'
import { buyerValidation } from './buying.validation'
import { buyingController } from './buying.controller'

const route = express.Router()

route.post('/buy/:id', validationRequest(buyerValidation.buyerValidationSchema), buyingController.createBooking)
route.get('/salehistory', buyingController.getAllBookings)

export const buyRoutes = route