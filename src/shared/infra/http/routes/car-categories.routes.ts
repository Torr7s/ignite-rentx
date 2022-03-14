import { Router } from 'express';

import multer from 'multer';

const upload = multer({ dest: './tmp' })

const carCategoryRouter = Router()

import { CreateCarCategoryController } from '../../../../modules/cars/useCases/createCarCategory/CreateCarCategoryController';
import { ListCarCategoriesController } from '../../../../modules/cars/useCases/listCarCategories/ListCarCategoriesController';
import { ImportCarCategoriesController } from '../../../../modules/cars/useCases/importCarCategories/ImportCarCategoriesController';

const CreateCarCategoryHandler   = new CreateCarCategoryController().handle
const ListCarCategoriesHandler   = new ListCarCategoriesController().handle
const ImportCarCategoriesHandler = new ImportCarCategoriesController().handle

carCategoryRouter.get('/', ListCarCategoriesHandler)

carCategoryRouter.post('/', CreateCarCategoryHandler)

carCategoryRouter.post('/import', upload.single('file'), ImportCarCategoriesHandler)

export { carCategoryRouter }