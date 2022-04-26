import { Router } from 'express';

import { carRouter } from './cars/cars.routes';
import { categoryRouter } from './cars/categories.routes';
import { specificationRouter } from './cars/specifications.routes';

import { authRouter } from './users/auth.routes';
import { userRouter } from './users/users.routes';

import { rentalRouter } from './rentals/rental.routes';

const router = Router()

router.use('/api/cars', carRouter)
router.use('/api/categories', categoryRouter)
router.use('/api/specifications', specificationRouter)

router.use('/api/users', userRouter)
router.use('/api', authRouter)

router.use('/api/rentals', rentalRouter)

export { router }