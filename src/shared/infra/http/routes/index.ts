import { Router } from 'express';

import { userRouter } from './users.routes';
import { authRouter } from './auth.routes';

import { carRouter } from './cars.routes';
import { rentalRouter } from './rental.routes';
import { categoryRouter } from './categories.routes';
import { specificationRouter } from './specifications.routes';

const router = Router()

router.use('/api/users', userRouter)
router.use(authRouter)

router.use('/api/cars', carRouter)
router.use('/api/rentals', rentalRouter)
router.use('/api/categories', categoryRouter)
router.use('/api/specifications', specificationRouter)

export { router }