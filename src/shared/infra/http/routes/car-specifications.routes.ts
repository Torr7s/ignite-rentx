import { Router } from 'express';

import { AuthUserMiddleware } from '@shared/infra/http/middlewares/auth-user.middleware';
import { AdminMiddleware } from '@shared/infra/http/middlewares/admin.middleware';

import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';

const carSpecificationRouter = Router()

const CreateCarSpecificationHandler = new CreateCarSpecificationController().handle

carSpecificationRouter.post(
  '/',
  AuthUserMiddleware,
  AdminMiddleware,
  CreateCarSpecificationHandler
)

export { carSpecificationRouter }