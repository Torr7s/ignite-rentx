import { Router } from 'express';

import { AuthUserMiddleware } from '@shared/infra/http/middlewares/auth-user.middleware';
import { AdminMiddleware } from '@shared/infra/http/middlewares/admin.middleware';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationRouter = Router()

const CreateCarSpecificationHandler = new CreateSpecificationController().handle

specificationRouter.post(
  '/',
  AuthUserMiddleware,
  AdminMiddleware,
  CreateCarSpecificationHandler
)

export { specificationRouter }