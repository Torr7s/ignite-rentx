import { Router } from 'express';

import { AuthUserMiddleware } from '@shared/infra/http/middlewares/auth-user.middleware';
import { AdminMiddleware } from '@shared/infra/http/middlewares/admin.middleware';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

const carRouter = Router()

const CreateCarHandler = new CreateCarController().handle

carRouter.post(
  '/', 
  AuthUserMiddleware, 
  AdminMiddleware, 
  CreateCarHandler
)

export { carRouter }