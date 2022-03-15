import { Router } from 'express';

import { userRouter } from './users.routes';
import { authUserRouter } from './auth-user.routes';

import { carRouter } from './cars.routes';
import { carCategoryRouter } from './car-categories.routes';
import { carSpecificationRouter } from './car-specifications.routes';

const router = Router()

router.use('/api/users', userRouter)
router.use(authUserRouter)

router.use('/api/cars', carRouter)
router.use('/api/cars/categories', carCategoryRouter)
router.use('/api/cars/specifications', carSpecificationRouter)

export { router }