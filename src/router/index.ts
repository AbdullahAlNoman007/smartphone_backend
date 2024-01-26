import express from 'express'
import { productRoutes } from '../Moduler/product/product.routes'

const router = express.Router()
const moduleRouters = [
    {
        path: '/product',
        router: productRoutes
    }
]
moduleRouters.map(route => router.use(route.path, route.router))

export default router