import express from 'express'
import validationRequest from '../../middleware/validationRequest'
import { productValidation } from './product.validation'
import { productController } from './product.controller'

const route = express.Router()

route.post('/create-product', validationRequest(productValidation.productValidationSchema), productController.createProduct)
route.get('/get-products', productController.getAllProduct)
route.get('/get-product', productController.getProduct)
route.delete('/delete-products', validationRequest(productValidation.productDelete), productController.deleteProduct)
route.put('/update-product/:id', validationRequest(productValidation.productDelete), productController.updateProduct)

export const productRoutes = route