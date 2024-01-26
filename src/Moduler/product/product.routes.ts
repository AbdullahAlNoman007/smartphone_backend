import express from 'express'
import validationRequest from '../../middleware/validationRequest'
import { productValidation } from './product.validation'
import { productController } from './product.controller'

const route = express.Router()

route.post('/create-product', validationRequest(productValidation.productValidationSchema), productController.createProduct)
route.get('/get-products', productController.getAllProduct)

export const productRoutes = route