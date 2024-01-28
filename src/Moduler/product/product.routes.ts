import express from 'express'
import validationRequest from '../../middleware/validationRequest'
import { productValidation } from './product.validation'
import { productController } from './product.controller'
import auth from '../../middleware/auth'

const route = express.Router()

route.post('/create-product', auth(), validationRequest(productValidation.productValidationSchema), productController.createProduct)
route.get('/get-products', auth(), productController.getAllProduct)
route.get('/get-product', auth(), productController.getProduct)
route.delete('/delete-products', auth(), validationRequest(productValidation.productDelete), productController.deleteProduct)
route.post('/update-product/:id', auth(), validationRequest(productValidation.productUpdateSchema), productController.updateProduct)

export const productRoutes = route