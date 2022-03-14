import { Router } from 'express';

import { carCategoryRouter } from './car-categories.routes';
import { carSpecificationRouter } from './car-specifications.routes';
import { userRouter } from './users.routes';
import { authUserRouter } from './auth-user.routes';

const router = Router()

router.use('/car/categories', carCategoryRouter)
router.use('/car/specifications', carSpecificationRouter)
router.use('/users', userRouter)
router.use(authUserRouter)

export { router }