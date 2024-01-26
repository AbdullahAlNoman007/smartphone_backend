import express from 'express'
import { productRoutes } from '../Moduler/product/product.routes'
import { userRoutes } from '../Moduler/user/user.routes'

const router = express.Router()
const moduleRouters = [
    {
        path: '/product',
        router: productRoutes
    },
    {
        path: '/user',
        router: userRoutes
    }
]
moduleRouters.map(route => router.use(route.path, route.router))

export default router