import { Router } from 'express';

import { carCategoryRouter } from './car-categories.routes';
import { carSpecificationRouter } from './car-specifications.routes';

const router = Router()

router.use('/car/categories', carCategoryRouter)
router.use('/car/specifications', carSpecificationRouter)

export { router }