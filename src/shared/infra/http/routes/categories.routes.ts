import { Router } from 'express';

import multer from 'multer';

const upload = multer({ dest: './tmp' })

const categoryRouter = Router()

import { AuthUserMiddleware } from '@shared/infra/http/middlewares/auth-user.middleware';
import { AdminMiddleware } from '@shared/infra/http/middlewares/admin.middleware';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ImportCategoriesController } from '@modules/cars/useCases/importCategories/ImportCategoriesController';

const CreateCategoryHandler   = new CreateCategoryController().handle
const ListCategoriesHandler   = new ListCategoriesController().handle
const ImportCategoriesHandler = new ImportCategoriesController().handle

categoryRouter.get('/', ListCategoriesHandler)

categoryRouter.post(
  '/',
  AuthUserMiddleware,
  AdminMiddleware,
  CreateCategoryHandler
)

categoryRouter.post(
  '/import',
  upload.single('file'),
  AuthUserMiddleware,
  AdminMiddleware,
  ImportCategoriesHandler
)

export { categoryRouter }