import { Request, Response, Router } from 'express';
import multer from 'multer';

const carCategoryRouter = Router()

import { createCarCategoryController } from '../modules/cars/useCases/createCarCategory';
import { listCarCategoriesController } from '../modules/cars/useCases/listCarCategories';
import { importCarCategoryController } from '../modules/cars/useCases/importCarCategory';

const upload = multer({ dest: './tmp' })

carCategoryRouter.get('/', (request: Request, response: Response) => {
  return listCarCategoriesController.handle(request, response)
})

carCategoryRouter.post('/', (request: Request, response: Response): Response => {
  return createCarCategoryController.handle(request, response)
})

carCategoryRouter.post('/import', upload.single('file'), (request: Request, response: Response) => {
  return importCarCategoryController.handle(request, response)
})

export { carCategoryRouter }